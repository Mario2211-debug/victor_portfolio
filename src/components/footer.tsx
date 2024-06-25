export default function ContactMe() {
  return (
    <div className="flex md:container justify-center text-center py-4">
      <span className="p-2 text-white">Contacte-me:</span>
      <form className="">
        <div className=" inline-block">
          <input
            className="border-2 rounded-lg text-center mr-0"
            type="text"
            placeholder="Digete o seu email"
          />
        </div>
      </form>
    </div>
  );
}
