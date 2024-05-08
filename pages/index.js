import Link from "next/link";

function index() {
  const logOutHandler = async () => {
    const res = await fetch("/api/auth/signout");
    const data = await res.json();
    console.log(data);
  };
  return (
    <div>
      <button>
        <Link href="/dashboard">Dashboard</Link>
      </button>
      <button style={{ margin: "30px" }}>
        <Link href="/signup">Sign up</Link>
      </button>
      <button>
        <Link href="/signin">Sign in</Link>
      </button>
      <button onClick={logOutHandler}>Log Out</button>
    </div>
  );
}

export default index;
