(() => {
  let expanded = false;

  init();
  schedulerRun();

  function init() {
    buildTree();
    injectCSS();
  }

  function schedulerRun() {
    if (scheduler) {
      clearTimeout(scheduler);
    }

    setInterval(() => {
      if (!expanded) {
        buildTree();
      }
    }, 5000);
  }

  function buildTree() {
    const content = document.getElementById("cf-floating-toc-container");

    if (content) {
      content.remove();
    }

    // Step 1: Get the div with id="content"
    const contentDiv =
      document.getElementById("content") ??
      document.getElementsByClassName("ak-editor-content-area")[0];

    if (contentDiv) {
      // Step 2: Get all headers within the contentDiv (h1 to h6)
      const headers = contentDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");

      if (headers.length === 0) {
        return false;
      }

      const indent = "&nbsp;&nbsp;";
      const indentationMap = {
        H1: "",
        H2: indent,
        H3: indent.repeat(2),
        H4: indent.repeat(3),
        H5: indent.repeat(4),
        H6: indent.repeat(5),
      };

      const collapsed = `
            <div id="cf-floating-toc-collapsed">
                ${"<div></div>".repeat(Math.min(headers.length, 20))}
            </div>
            `;

      let html = `<div id="cf-floating-toc-container">${collapsed} <ul id="cf-floating-toc">`;

      for (const [index, header] of headers.entries()) {
        html += `<li>${
          indentationMap[header.tagName]
        } <a href="#" class="toc-link" data-index="${index}">- ${
          header.innerText
        }</a></li>`;
      }

      html += "</ul> </div>";

      document.body.insertAdjacentHTML("beforeend", html);

      const collapsedContainer = document.getElementById(
        "cf-floating-toc-collapsed"
      );
      const tocContainer = document.getElementById("cf-floating-toc-container");
      const tocList = document.getElementById("cf-floating-toc");

      collapsedContainer.addEventListener("mouseover", function () {
        expanded = true;
        collapsedContainer.style.display = "none";
        tocList.style.display = "block";
      });

      tocContainer.addEventListener("mouseleave", function () {
        expanded = false;
        tocList.style.display = "none";
        collapsedContainer.style.display = "flex";
      });

      // Attach event listeners to all the links
      const tocLinks = document.querySelectorAll(".toc-link");
      tocLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent the default anchor behavior
          const index = this.getAttribute("data-index");
          scrollToHeader(index);
        });
      });

      function scrollToHeader(index) {
        const element = headers[index];

        // Scroll the element into view
        element.scrollIntoView();
      }

      return true;
    } else {
      console.error("Content div not found");

      return false;
    }
  }

  function injectCSS() {
    const styles = `
    #cf-floating-toc {
        display: none;
        position: fixed;
        top: 50%;
        right: 10px;
        transform: translate(0, -50%);
        z-index: 5;
        list-style: none;
        overflow: scroll;
        max-height: 70vh;
        width: 258px;
        padding: 12px 12px;
        background-color: white;
        box-shadow: rgba(15, 15, 15, 0.04) 0px 0px 0px 1px, rgba(15, 15, 15, 0.03) 0px 3px 6px, rgba(15, 15, 15, 0.06) 0px 9px 24px;
        border: 1px solid rgba(55, 53, 47, 0.06);
        border-radius: 14px;
        font-size: 14px;
        line-height: 1.3;
    }

    #cf-floating-toc li {
        padding: 4px;
    }

    #cf-floating-toc li:hover {
        background: rgba(227, 226, 224, 0.5);
        border-radius: 4px;
    }

    #cf-floating-toc a {
        text-decoration: none;
        color: rgb(120, 119, 116);
    }

    #cf-floating-toc-collapsed {
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translate(0, -50%);
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    #cf-floating-toc-collapsed > div {
        background-color: rgb(227, 226, 224);
        height: 2px;
        width: 16px;
        transition: background 0.2s, box-shadow 0.2s;
        box-shadow: none;
        border-radius: 2px;
        margin-left: 0px;
    }
`;

    // Create a <style> element and add the styles
    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }
})();
