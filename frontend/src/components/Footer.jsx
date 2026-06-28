import { FiHeart } from "react-icons/fi";
import { RiReactjsFill } from "react-icons/ri";
import { SiTailwindcss } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[#1e293b] bg-[#0b0f1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1.5 text-sm text-slate-500">
            Made with
            <FiHeart className="text-red-400 text-xs" />
            using
            <span className="inline-flex items-center gap-1 text-slate-400">
              <RiReactjsFill className="text-cyan-400" />
              React
            </span>
            +
            <span className="inline-flex items-center gap-1 text-slate-400">
              <SiTailwindcss className="text-cyan-400" />
              Tailwind
            </span>
          </p>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} AI Investment Research Agent
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
