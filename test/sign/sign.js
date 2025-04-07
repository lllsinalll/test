const container = document.querySelector(".form-container");
const showSignup = document.getElementById("show-signup");
const showLogin = document.getElementById("show-login");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const homeButton = document.querySelector(".home-button");
const userTypeSelector = document.querySelector(".user-type-selector");

// Toggle between forms
showSignup.addEventListener("click", () => {
  container.classList.add("active");
});

showLogin.addEventListener("click", () => {
  container.classList.remove("active");
});

// Home button functionality
homeButton.addEventListener("click", (e) => {
  e.preventDefault();

  window.location.href = "../index.html"; // Uncomment to enable actual navigation
});

// Email validation function
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Custom validation for login form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername");
  const password = document.getElementById("loginPassword");
  let isValid = true;

  // Reset errors
  document.querySelectorAll(".input-group").forEach((group) => {
    group.classList.remove("error");
  });

  // Validate username/email
  if (!username.value.trim()) {
    username.closest(".input-group").classList.add("error");
    username
      .closest(".input-group")
      .querySelector(".error-message").textContent =
      "لطفا ایمیل خود را وارد کنید";
    isValid = false;
  } else if (username.value.includes("@")) {
    if (!isValidEmail(username.value)) {
      username.closest(".input-group").classList.add("error");
      username
        .closest(".input-group")
        .querySelector(".error-message").textContent =
        "لطفا ایمیل معتبر وارد کنید";
      isValid = false;
    }
  }

  // Validate password
  if (!password.value.trim()) {
    password.closest(".input-group").classList.add("error");
    password
      .closest(".input-group")
      .querySelector(".error-message").textContent = "این فیلد الزامی است";
    isValid = false;
  } else if (password.value.length < 6) {
    password.closest(".input-group").classList.add("error");
    password
      .closest(".input-group")
      .querySelector(".error-message").textContent =
      "رمز عبور باید حداقل ۶ کاراکتر باشد";
    isValid = false;
  }

  if (isValid) {
    // Form is valid, submit it
    alert("فرم ورود با موفقیت ارسال شد!");
    loginForm.reset();
  }
});

// Custom validation for signup form
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const userType = document.querySelector('input[name="userType"]:checked');
  let isValid = true;

  // Reset all errors
  document.querySelectorAll(".input-group").forEach((group) => {
    group.classList.remove("error");
  });
  userTypeSelector.classList.remove("error");

  // Validate user type
  if (!userType) {
    userTypeSelector.classList.add("error");
    isValid = false;
  }

  // Validate full name
  if (!fullName.value.trim()) {
    fullName.closest(".input-group").classList.add("error");
    fullName
      .closest(".input-group")
      .querySelector(".error-message").textContent = "این فیلد الزامی است";
    isValid = false;
  }

  // Validate email
  if (!email.value.trim()) {
    email.closest(".input-group").classList.add("error");
    email.closest(".input-group").querySelector(".error-message").textContent =
      "این فیلد الزامی است";
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    email.closest(".input-group").classList.add("error");
    email.closest(".input-group").querySelector(".error-message").textContent =
      "لطفا ایمیل معتبر وارد کنید";
    isValid = false;
  }

  // Validate password
  if (!password.value.trim()) {
    password.closest(".input-group").classList.add("error");
    password
      .closest(".input-group")
      .querySelector(".error-message").textContent = "این فیلد الزامی است";
    isValid = false;
  } else if (password.value.length < 6) {
    password.closest(".input-group").classList.add("error");
    password
      .closest(".input-group")
      .querySelector(".error-message").textContent =
      "حداقل ۶ کاراکتر وارد کنید";
    isValid = false;
  }

  // Validate confirm password
  if (!confirmPassword.value.trim()) {
    confirmPassword.closest(".input-group").classList.add("error");
    confirmPassword
      .closest(".input-group")
      .querySelector(".error-message").textContent = "این فیلد الزامی است";
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    confirmPassword.closest(".input-group").classList.add("error");
    confirmPassword
      .closest(".input-group")
      .querySelector(".error-message").textContent =
      "رمزهای عبور مطابقت ندارند";
    isValid = false;
  }

  if (isValid) {
    // Form is valid, submit it
    alert(
      `فرم ثبت نام با موفقیت ارسال شد! (نوع کاربر: ${
        userType.value === "student" ? "دانش آموز" : "معلم"
      })`
    );
    signupForm.reset();
  }
});

// Real-time password match check
confirmPasswordInput.addEventListener("input", () => {
  const passwordGroup = passwordInput.closest(".input-group");
  const confirmGroup = confirmPasswordInput.closest(".input-group");

  if (passwordInput.value && confirmPasswordInput.value) {
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmGroup.classList.add("error");
      confirmGroup.querySelector(".error-message").textContent =
        "رمزهای عبور مطابقت ندارند";
    } else {
      confirmGroup.classList.remove("error");
      passwordGroup.classList.remove("error");
    }
  } else {
    confirmGroup.classList.remove("error");
  }
});

// Clear errors when typing
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    input.closest(".input-group").classList.remove("error");
    if (input.name === "userType") {
      userTypeSelector.classList.remove("error");
    }
  });
});

// Set default selected user type
document.getElementById("student").checked = true;
document.addEventListener("DOMContentLoaded", function () {
  // Force show confirm password field
  const confirmField = document.getElementById("confirmPassword");
  if (confirmField) {
    confirmField.style.display = "block";
    confirmField.style.visibility = "visible";
    confirmField.style.opacity = "1";
  }

  // Debugging - log form elements
  console.log("Form elements:", {
    container: document.querySelector(".form-container"),
    signupForm: document.getElementById("signupForm"),
    confirmField: confirmField,
  });
});
