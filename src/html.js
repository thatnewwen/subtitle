import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d');

            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resize();
            window.onresize = resize;

            function noise(ctx) {
                
                var w = ctx.canvas.width,
                    h = ctx.canvas.height,
                    idata = ctx.createImageData(w, h),
                    buffer32 = new Uint32Array(idata.data.buffer),
                    len = buffer32.length,
                    i = 0;

                for(; i < len;)
                    buffer32[i++] = ((255 * Math.random())|0) << 24;
                
                ctx.putImageData(idata, 0, 0);
            }

            var toggle = true;

            // added toggle to get 30 FPS instead of 60 FPS
            (function loop() {
                toggle = !toggle;
                if (toggle) {
                    requestAnimationFrame(loop);
                    return;
                }
                noise(ctx);
                requestAnimationFrame(loop);
            })();

        `
          }}
        />
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
