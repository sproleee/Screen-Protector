class Protector {
  constructor(options) {
    this.options = options || {
      selectAll: true,
      copy: true,
      paste: true,
      cut: true,
      save: true,
      viewSource: true,
      print: true,
      disableRightClick: true,
      disableTextSelection: true,
      disableImageDragging: true,
    };
    this.keys = {
      selectAll: 65, // CTRL + A
      copy: 67, // CTRL + C
      paste: 86, // CTRL + V
      cut: 88, // CTRL + X
      save: 83, // CTRL + S
      viewSource: 85, // CTRL + U
      print: 80, // CTRL + P
    };
  }

  init() {
    const {
      disableRightClick,
      disableTextSelection,
      disableImageDragging,
    } = this.options;
    for (let key in this.options) {
      if (this.options[key]) {
        this.disableKey(this.keys[key]);
      }
    }
    if (disableRightClick) this.disableRightClick();
    if (disableTextSelection) this.disableTextSelection();
    if (disableImageDragging) this.disableImageDragging();
  }

  disableSelectorCSS() {
    const css = document.createElement("style");
    css.type = "text/css";
    css.innerText =
      "* {-webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important; }";
    document.head.appendChild(css);
  }

  disableRightClickDocumentStyles() {
    document.body.style.cursor = "default";
    if (
      typeof document.documentElement.style.webkitTouchCallout !== "undefined"
    ) {
      document.documentElement.style.webkitTouchCallout = "none";
    }
    if (
      typeof document.documentElement.style.webkitUserSelect !== "undefined"
    ) {
      document.documentElement.style.webkitUserSelect = "none";
    }
  }

  disableKey(keyCode) {
    window.addEventListener("keydown", e => {
      if (
        (e.ctrlKey && e.which === keyCode) ||
        (e.metaKey && e.which === keyCode)
      )
        e.preventDefault();
    });
    document.keypress = e => {
      if (
        (e.ctrlKey && e.which === keyCode) ||
        (e.metaKey && e.which === keyCode)
      )
        return false;
    };
  }

  disableRightClick() {
    document.oncontextmenu = e => {
      const t = e || window.event;
      const n = t.target || t.srcElement;
      if (n.nodeName !== "A") return false;
    };
    document.body.oncontextmenu = () => false;
    document.onmousedown = e => {
      if (e.button === 2) return false;
    };
  }

  disableTextSelection() {
    if (typeof document.body.onselectstart !== "undefined") {
      document.body.onselectstart = () => false;
    }
    if (typeof document.body.style.MozUserSelect !== "undefined") {
      document.body.style.MozUserSelect = "none";
    }
    if (typeof document.body.style.webkitUserSelect !== "undefined") {
      document.body.style.webkitUserSelect = "none";
    }
    if (typeof document.body.onmousedown !== "undefined") {
      document.body.onmousedown = () => false;
    }
    this.disableRightClickDocumentStyles();
    this.disableSelectorCSS();
  }

  disableImageDragging() {
    document.ondragstart = () => false;
  }
}

export default Protector;
