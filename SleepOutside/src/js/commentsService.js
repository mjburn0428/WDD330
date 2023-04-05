import { getParams, setLocalStorage, getLocalStorage } from "./utils.mjs";

const form = document.querySelector("#comment-form");

class CommentsService {
  constructor(localStorageKey, productId) {
    this.localStorageKey = localStorageKey;
    this.productId = productId;
  }

  getComments() {
    return getLocalStorage(this.localStorageKey);
  }

  saveComment() {
    let textAreaValue = document.querySelector("#comment-textarea").value;

    const comments = this.getComments();

    // create local storage for comments in the first use
    if (!comments) {
      setLocalStorage(this.localStorageKey, [
        {
          productId: this.productId,
          comments: [textAreaValue],
        },
      ]);

      return;
    }

    let commentsCopy = [...comments];

    const index = comments.findIndex(
      (entry) => entry.productId === this.productId
    );

    if (index === -1) {
      commentsCopy.push({
        productId: this.productId,
        comments: [textAreaValue],
      });

      setLocalStorage(this.localStorageKey, commentsCopy);
      return;
    }

    commentsCopy[index].comments = [
      ...commentsCopy[index].comments,
      textAreaValue,
    ];

    document.querySelector("#comment-textarea").value = "";

    setLocalStorage(this.localStorageKey, commentsCopy);
  }

  printComments() {
    const commentsContainer = document.querySelector(".comments");

    const comments = this.getComments();

    if (comments) {
      const productComments = comments.find(
        (comment) => comment.productId === this.productId
      );

      if (productComments) {
        productComments.comments.forEach((comment) => {
          const template = `
          <div class="comment">
          <img src="https://ui-avatars.com/api/?name=John+Doe" alt="user profile image" />
          <textarea disabled>${comment}</textarea>
          </div>`;

          commentsContainer.insertAdjacentHTML("afterend", template);
        });
      }
    }
  }

  printNewComment() {
    const commentsContainer = document.querySelector(".comments");

    const comments = this.getComments();

    const productComments = comments.find(
      (comment) => comment.productId === this.productId
    );

    const newComment = productComments.comments.slice(-1);

    const template = `
    <div class="comment">
      <img src="https://ui-avatars.com/api/?name=John+Doe" alt="user profile image" />
        <textarea disabled>${newComment[0]}</textarea>
    </div>`;

    commentsContainer.insertAdjacentHTML("afterend", template);
  }
}

const commentService = new CommentsService("comments", getParams("product"));

commentService.printComments();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  commentService.saveComment();

  commentService.printNewComment();
});
