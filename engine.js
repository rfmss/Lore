// engine.js — motor Lifeline · ES5
var Engine = (function () {

  var _story = null;
  var _nodeId = null;
  var _timers = [];
  var _shownIds = {};  // eventId -> true (para resume)
  var _history = [];   // [{type, text}]
  var _msgEl = null;
  var _typingEl = null;
  var _choicesEl = null;
  var _statusEl = null;

  /* ── persist ── */
  function _save() {
    try {
      localStorage.setItem('lore_v1', JSON.stringify({
        nodeId: _nodeId,
        history: _history,
        shownIds: _shownIds
      }));
    } catch (e) {}
  }

  function _load() {
    try {
      var s = localStorage.getItem('lore_v1');
      return s ? JSON.parse(s) : null;
    } catch (e) { return null; }
  }

  /* ── DOM ── */
  function _appendMsg(type, text, instant) {
    var div = document.createElement('div');
    if (type === 'char')    div.className = 'msg msg-char';
    else if (type === 'unknown') div.className = 'msg msg-unknown';
    else if (type === 'sys')     div.className = 'msg msg-sys';
    else if (type === 'player')  div.className = 'msg msg-player';
    div.textContent = text;
    if (instant) { div.style.webkitAnimation = 'none'; div.style.animation = 'none'; }
    _msgEl.appendChild(div);
    if (!instant) _scrollBottom();
  }

  function _scrollBottom() {
    _msgEl.scrollTop = _msgEl.scrollHeight;
  }

  function _showTyping() {
    if (_typingEl) _typingEl.style.display = '-webkit-flex';
    if (_typingEl) _typingEl.style.display = 'flex';
    if (_statusEl) _statusEl.textContent = 'digitando...';
  }

  function _hideTyping() {
    if (_typingEl) _typingEl.style.display = 'none';
    if (_statusEl) _statusEl.textContent = 'online';
  }

  function _clearChoices() {
    if (_choicesEl) _choicesEl.innerHTML = '';
  }

  function _showChoices(opts) {
    _clearChoices();
    for (var i = 0; i < opts.length; i++) {
      (function (opt) {
        var btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = opt.text;
        btn.onclick = function () { _choose(opt.text, opt.next); };
        _choicesEl.appendChild(btn);
      })(opts[i]);
    }
    _scrollBottom();
  }

  function _choose(text, nextNode) {
    _clearChoices();
    _appendMsg('player', text, false);
    _history.push({ type: 'player', text: text });
    _save();
    _processNode(nextNode);
  }

  /* ── timers ── */
  function _clearTimers() {
    for (var i = 0; i < _timers.length; i++) clearTimeout(_timers[i]);
    _timers = [];
  }

  function _delay(fn, ms) {
    var t = setTimeout(fn, ms);
    _timers.push(t);
  }

  /* ── story processing ── */
  function _processNode(nodeId) {
    _nodeId = nodeId;
    _save();
    var node = _story.nodes[nodeId];
    if (!node) return;
    _processEvents(node, 0, 0);
  }

  // accumulated: total ms elapsed within this node (for positioning typing indicator)
  function _processEvents(node, idx, accumulated) {
    if (idx >= node.length) return;
    var ev = node[idx];
    var evId = _nodeId + '.' + idx;

    if (ev.t === 'msg' || ev.t === 'unknown') {
      var msgDelay = ev.delay || 0;
      var totalDelay = accumulated + msgDelay;
      var typingDelay = Math.max(totalDelay - 600, accumulated + 50);

      if (_shownIds[evId]) {
        // already shown — skip with 0 delay
        _processEvents(node, idx + 1, accumulated);
        return;
      }

      if (msgDelay === 0) {
        var type = ev.from === 'unknown' ? 'unknown' : 'char';
        _appendMsg(type, ev.text, false);
        _history.push({ type: type, text: ev.text });
        _shownIds[evId] = true;
        _save();
        _processEvents(node, idx + 1, accumulated);
      } else {
        _delay(function () { _showTyping(); }, typingDelay);
        _delay(function () {
          _hideTyping();
          var type = ev.from === 'unknown' ? 'unknown' : 'char';
          _appendMsg(type, ev.text, false);
          _history.push({ type: type, text: ev.text });
          _shownIds[evId] = true;
          _save();
          _processEvents(node, idx + 1, totalDelay);
        }, totalDelay);
      }

    } else if (ev.t === 'sys') {
      if (_shownIds[evId]) {
        _processEvents(node, idx + 1, accumulated);
        return;
      }
      _delay(function () {
        _appendMsg('sys', ev.text, false);
        _history.push({ type: 'sys', text: ev.text });
        _shownIds[evId] = true;
        _save();
        _processEvents(node, idx + 1, accumulated + 500);
      }, accumulated + 300);

    } else if (ev.t === 'choice') {
      _delay(function () {
        _showChoices(ev.opts);
      }, accumulated + 200);

    } else if (ev.t === 'goto') {
      _delay(function () {
        _processNode(ev.next);
      }, accumulated + 100);

    } else if (ev.t === 'end') {
      _nodeId = null;
      _save();
    }
  }

  /* ── public ── */
  return {
    start: function (storyData, elements) {
      _story = storyData;
      _msgEl = elements.messages;
      _typingEl = elements.typing;
      _choicesEl = elements.choices;
      _statusEl = elements.status;

      var saved = _load();

      if (saved && saved.history && saved.history.length > 0) {
        // Resume: replay history instantly
        _history = saved.history;
        _shownIds = saved.shownIds || {};
        for (var i = 0; i < _history.length; i++) {
          _appendMsg(_history[i].type, _history[i].text, true);
        }
        _scrollBottom();
        if (saved.nodeId) {
          _processNode(saved.nodeId);
        }
      } else {
        _history = [];
        _shownIds = {};
        _processNode('start');
      }
    },

    reset: function () {
      _clearTimers();
      try { localStorage.removeItem('lore_v1'); } catch (e) {}
      location.reload();
    }
  };
})();
