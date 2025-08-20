export const Quote = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <div className="flex flex-col gap-4 bg-[#0d1a42] p-2 rounded-2xl">
        <div>Note is the Only thing that makes you superior than other</div>

        <div className="flex justify-center items-start  gap-2">
          <div className=" h-9 w-9 rounded-full mt-2">
            <img src="src\assets\profile-pic.png" alt="" />
          </div>
          <div>
            Mr. Satya Prakash
            <div>Web Developer</div>
          </div>
        </div>
      </div>
    </div>
  );
};
