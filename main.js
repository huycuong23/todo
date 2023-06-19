const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (function () {
  const lists = ["BMW"];
  const showList = $("#root");
  const inputList = $("#input");
  const submitList = $("#subbmid");
  var completecount = [];
  return {
    add(list) {
      lists.push(list);
    },
    del(index) {
      lists.splice(index, 1);
    },
    show() {
      const htmls = lists
        .map(function (list, index) {
          return `<div class="todo-list">
          <div class="${completecount
            .map(function (value) {
              if (index == value) {
                return "complete";
              }
              return "";
            })
            .join("")} todo-comp"  id=${index}>
            <i class="fa-solid fa-check"></i>
            </div>
        <li class="todo-item">${list}
          <button  data-index="${index}" id="delete">X</button>
        </li>
        </div>`;
        })
        .join("");
      showList.innerHTML = htmls;
    },
    handeldelete(event) {
      const delIndex = event.target.closest("#delete");
      if (delIndex) {
        this.del(delIndex.getAttribute("data-index"));
        this.show();
      }
    },
    init() {
      document.addEventListener("keydown", (event) => {
        if (event.which === 13) {
          const list = inputList.value;
          if (list !== "") {
            this.add(list);
            this.show();
            inputList.value = null;
            inputList.focus();
          } else {
            inputList.focus();
          }
        }
      });
      submitList.onclick = () => {
        const list = inputList.value;
        if (list !== "") {
          this.add(list);
          this.show();
          inputList.value = null;
          inputList.focus();
        } else {
          inputList.focus();
        }
      };
      const complete = $(".container");
      complete.onclick = (e) => {
        const ele = e.target.closest(".todo-comp");
        if (ele) {
          ele.classList.toggle("complete");
          if (completecount.length == 0) {
            completecount.push(ele.id);
          }
          if (completecount.length > 0) {
            var hasCompleted = completecount.some((val, i) => val == ele.id ? i : "");
            if (!hasCompleted) {
              completecount.push(ele.id);
            }
            if (hasCompleted) {
              completecount.splice(completecount.indexOf(e.target.id), 1);
            }
          }
        }
      };
      showList.onclick = this.handeldelete.bind(this);
      this.show();
    },
  };
})();
app.init();
