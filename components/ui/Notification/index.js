let isVisivle = false

function addNotification({ message, type }) {
  let toast = typeof window !== "undefined" && document.getElementById("toast-root")
  if (isVisivle || !toast) return
  toast.innerHTML = message
  if (type === "success") {
    toast.classList.add("toast", "toat_success")
  }
  if (type === "error") {
    toast.classList.add("toast", "toat_error")
  }
  if (type === "warring") {
    toast.classList.add("toast", "toat_warring")
  }
  isVisivle = true
  if (toast) {
    toast.addEventListener("animationend", () => {
      toast.innerHTML = ""
      toast.className = ""
      isVisivle = false
    })
  }
}

const notification = {
  success: ({ message }) => {
    addNotification({ message, type: "success" })
  },
  warring: ({ message }) => {
    addNotification({ message, type: "warring" })
  },
  error: ({ message }) => {
    addNotification({ message, type: "error" })
  }
}

export default notification
