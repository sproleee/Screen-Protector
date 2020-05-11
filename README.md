# Screen Protector
Protect your content from copying (aside from developer console).

# Install
Run ```npm install legit-protector```

# To Use
Instantiate ```new Protector({...config}).init()```

# Configuration
If no configuration is passed, all activities are blocked.

```{
{
    selectAll: // prevent select all via CTRL + A; default: true,
    copy: // prevent copy via CTRL + C; default: true,
    paste: // prevent paste via CTRL + P; default: true,
    cut: // prevent cut via CTRL + X; default: true,
    save: // prevent save via CTRL + S; default: true,
    viewSource: // prevent view source via CTRL + U; default: true,
    print: // prevent print via CTRL + P; default: true,
    disableRightClick: // prevent mouse right click; default: true,
    disableTextSelection: // prevent text select via mouse; default: true,
    disableImageDragging: // prevent image dragging via mouse; default: true,
  }
