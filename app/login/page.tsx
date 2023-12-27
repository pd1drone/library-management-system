import Image from "next/image";


export default function page() {

  return (
    <main className="h-screen">
      <Image
        className="absolute -z-20"
        src={"/images/background_library.png"}
        fill={true}
        objectFit="cover"
        alt="bg-login"
      />
      <div className="flex flex-col md:flex-row items-center justify-center gap-36 h-screen">
        <div className="w-full max-w-sm ">
          <div className="aspect-square w-full max-w-[100px] md:max-w-[100px] relative m-auto mb-5">
            <Image src={"/images/LOA.png"} fill={true} alt="SjLogo" />
          </div>

          <div className="mb-5 text-center">
            <h1 className="font-bold text-3xl text-black">
              Library Management System
            </h1>
          </div>

          <div>
            <form className="flex flex-col gap-4">
                {/* {loginError && (
                <div role="alert" className="login-error">
                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Error:
                    </div>
                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p className="error-message">{loginError}</p>
                    </div>
                </div>
                )} */}
                <input
                className="px-2 py-2 rounded-md"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                //value={""}
                //   onChange={(e) => setUsername(e.target.value)}
                />
                <input
                className="px-2 py-2 rounded-md"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                //value={""}
                //   onChange={(e) => setPassword(e.target.value)}
                />
                <button
                className="uppercase px-2 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-800"
                type="button"
                //   onClick={handleLogin}
                >
                Sign In
                </button>
            </form>
            </div>

        </div>
      </div>
    </main>
  );
}
