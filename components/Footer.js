import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-1 py-2 px-0 justify-center items-center border-t-2 border-red-300">
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <span className="">
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  );
}
