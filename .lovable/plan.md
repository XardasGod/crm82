

## Fix: Move Facebook Pixel noscript tag from head to body

The build error is caused by the Facebook Pixel `<noscript><img .../>` tag being placed inside `<head>`, which is invalid HTML. The `<img>` element is disallowed content inside `<noscript>` when it's in the `<head>`.

### Change
**`index.html`**: Move the FB Pixel `<noscript>` block from `<head>` (line 100) to `<body>`, right after the existing Yandex.Metrika `<noscript>` block.

