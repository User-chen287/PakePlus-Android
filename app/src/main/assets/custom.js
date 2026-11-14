window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});(function () {
  var PORTAL_URL = 'https://seatmap.365lawhelp.com/';

  /* ===== 恢复外链跳转 ===== */
  var hookClick = function (e) {
    var origin = e.target.closest('a');
    var isBaseTargetBlank = document.querySelector('head base[target="_blank"]');
    if (
      (origin && origin.href && origin.target === '_blank') ||
      (origin && origin.href && isBaseTargetBlank)
    ) {
      e.preventDefault();
      location.href = origin.href;
    }
  };
  window.open = function (url) { location.href = url; };
  document.addEventListener('click', hookClick, { capture: true });

  /* ===== 悬浮返回按钮（白色款）===== */
  function buildBtn() {
    var btn = document.createElement('button');
    btn.textContent = '🏠';
    btn.title = '返回门户';
    btn.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:2147483647;' +
      'width:46px;height:46px;border-radius:50%;border:1px solid #f0f0f0;cursor:pointer;' +
      'background:#ffffff;color:#1a73e8;font-size:19px;' +
      'box-shadow:0 2px 12px rgba(0,0,0,.16);' +
      'display:flex;align-items:center;justify-content:center;padding:0;margin:0;';
    btn.onclick = function () { location.href = PORTAL_URL; };
    return btn;
  }

  function ensureBtn() {
    // 只在自己工位系统的门户页/登录页隐藏（按域名判断，不再误伤 lawone 的 /admin/login）
    var h = location.hostname;
    var ours = (h === 'seatmap.365lawhelp.com' || h === 'localhost' || h === '127.0.0.1');
    if (ours && (location.pathname.indexOf('/portal') === 0 || location.pathname.indexOf('/login') === 0)) return;
    if (!document.getElementById('pp-back-home')) {
      var b = buildBtn();
      b.id = 'pp-back-home';
      (document.body || document.documentElement).appendChild(b);
    }
  }

  setInterval(ensureBtn, 800);
  document.addEventListener('DOMContentLoaded', ensureBtn);
  window.addEventListener('load', ensureBtn);
  if (document.body) ensureBtn();
  new MutationObserver(ensureBtn).observe(
    document.documentElement, { childList: true, subtree: false }
  );
})();
