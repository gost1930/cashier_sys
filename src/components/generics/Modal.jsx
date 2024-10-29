import { IoIosCloseCircleOutline } from "react-icons/io";

function Modal({ handlChange, showContent, children }) {
  return (
    <section
      className={`${showContent} grid place-items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-5
     min-w-full min-h-full bg-gray-300/50 cursor-not-allowed`}
    >
      <div className="bg-gray-200 relative z-50  overflow-y-scroll min-w-2/3  p-5  rounded-lg shadow-2xl cursor-default">
        <IoIosCloseCircleOutline
          onClick={handlChange}
          className="text-3xl absolute top-4 right-4 cursor-pointer"
        />
        {children}
      </div>
    </section>
  );
}

export default Modal;
