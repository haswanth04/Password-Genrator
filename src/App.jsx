import { useState, useEffect, useCallback, useRef } from "react";


function App() {
  const [length, setLength] = useState(8);
  const [numberallowed, setNumberallowed] = useState(false);
  const [charallowed, setCharallowed] = useState(false);
  const [pasword, setPassword] = useState("");

  const paswordref = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*()_+";
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberallowed, charallowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberallowed, charallowed]);

  const copypasstoClipboard = () => {
    window.navigator.clipboard.writeText(pasword);
    paswordref.current?.select();
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-800">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-black text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-gray-800 text-white border border-gray-500 ">
          <input
            type="text"
            value={pasword}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={paswordref}
          />

          <button
            className="outline-nonetext-white px-3 py-0.5 shrink-0 bg-blue-600 hover:bg-blue-500 rounded-md"
            onClick={copypasstoClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 ">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer bg-gray-700"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-gray-300">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberallowed}
              className="cursor-pointer"
              onChange={() => setNumberallowed((prev) => !prev)}
            />
            <label className="text-gray-300">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charallowed}
              className="cursor-pointer"
              onChange={() => setCharallowed((prev) => !prev)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
