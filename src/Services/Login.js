const LoginforAdmin = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8000/admin/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Successgully fetched at frontend");
    if (!response.ok) {
      throw new Error(`Error! status:`);
    }
    const result = await response.json();

    localStorage.setItem("admintoken", JSON.stringify(result.token));
    return result;
  } catch (err) {
    alert(err.message);
    console.log(err);
  }
};

export default LoginforAdmin;
