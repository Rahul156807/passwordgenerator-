import { useCallback, useState, useEffect ,useRef } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isNumberAllowed) str += "1234567890";
    if (isCharAllowed) str += "!@#$^&*()_+:<>?|";

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, isNumberAllowed, isCharAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumberAllowed, isCharAllowed, passwordGenerator]);

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
 window.navigator.clipboard.writeText(password);
  },[password])
   

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-xl bg-blue-400 text-orange my-8 px-4 py-3 ">
        <h1 className="text-xl text-center font-bold my-3">PASSWORD GENERATOR</h1>
        <div className="flex rounded-xl shadow-md overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button className="pl-2 outline-none bg-green-300 pr-2" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-2">
          <div className="flex items-center">
            <input
              type="range"
              min={4}
              max={80}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={isNumberAllowed}
              onChange={() => setIsNumberAllowed((prev) => !prev)}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={isCharAllowed}
              onChange={() => setIsCharAllowed((prev) => !prev)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
