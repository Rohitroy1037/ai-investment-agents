const Footer = () => {
  return (
    <footer className="border-t border-[#1e293b] bg-[#0b0f1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <p className="text-center text-xs text-slate-600">
          © {new Date().getFullYear()} AI Investment Research Agent
        </p>
      </div>
    </footer>
  );
};

export default Footer;
