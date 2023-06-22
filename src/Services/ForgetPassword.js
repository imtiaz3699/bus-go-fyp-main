export const sendEmail = async (email) => {
  try {
    const response = await fetch("http://localhost:8000/admin/sendEmail", {
      method: "post",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status:`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const changepassword = async (Code, password) => {
  try {
    const response = await fetch("http://localhost:8000/admin/changePassword", {
      method: "post",
      body: JSON.stringify({ Code, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status:`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};
