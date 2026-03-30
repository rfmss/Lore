// engine.js — motor Lifeline · ES5
var Engine = (function () {

  var _story = null;
  var _nodeId = null;
  var _timers = [];
  var _shownIds = {};
  var _history = [];
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
    if (_typingEl) { _typingEl.style.display = '-webkit-flex'; _typingEl.style.display = 'flex'; }
    if (_statusEl) _statusEl.textContent = 'digitando...';
    _scrollBottom();
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

  function _later(fn, ms) {
    var t = setTimeout(fn, ms);
    _timers.push(t);
  }

  /* ── story processing ──
     Cada evento usa delay relativo ao anterior (não acumulado).
     Os callbacks sempre chamam _processEvents com idx+1, zero acumulado.
  ── */
  function _processNode(nodeId) {
    _nodeId = nodeId;
    _save();
    var node = _story.nodes[nodeId];
    if (!node) return;
    _processEvents(node, 0);
  }

  function _processEvents(node, idx) {
    if (idx >= node.length) return;

    var ev = node[idx];
    var evId = _nodeId + '.' + idx;

    /* ── mensagem de personagem ── */
    if (ev.t === 'msg' || ev.t === 'unknown') {
      var d = ev.delay || 0;

      if (_shownIds[evId]) {
        // já mostrada — pula instantaneamente
        _processEvents(node, idx + 1);
        return;
      }

      var from = ev.from || ev.t;
      var type = (from === 'unknown') ? 'unknown' : 'char';

      if (d <= 0) {
        _appendMsg(type, ev.text, false);
        _history.push({ type: type, text: ev.text });
        _shownIds[evId] = true;
        _save();
        _processEvents(node, idx + 1);
      } else {
        // mostra "digitando..." 700ms antes
        var typingIn = Math.max(d - 700, 50);
        _later(function () { _showTyping(); }, typingIn);
        _later((function (evId2, type2, ev2, node2, idx2) {
          return function () {
            _hideTyping();
            _appendMsg(type2, ev2.text, false);
            _history.push({ type: type2, text: ev2.text });
            _shownIds[evId2] = true;
            _save();
            _processEvents(node2, idx2 + 1);
          };
        })(evId, type, ev, node, idx), d);
      }

    /* ── mensagem de sistema ── */
    } else if (ev.t === 'sys') {
      if (_shownIds[evId]) { _processEvents(node, idx + 1); return; }
      _later((function (evId2, ev2, node2, idx2) {
        return function () {
          _appendMsg('sys', ev2.text, false);
          _history.push({ type: 'sys', text: ev2.text });
          _shownIds[evId2] = true;
          _save();
          _processEvents(node2, idx2 + 1);
        };
      })(evId, ev, node, idx), 400);

    /* ── escolha ── */
    } else if (ev.t === 'choice') {
      _later(function () { _showChoices(ev.opts); }, 200);

    /* ── goto ── */
    } else if (ev.t === 'goto') {
      _later((function (next) {
        return function () { _processNode(next); };
      })(ev.next), 80);

    /* ── fim ── */
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
