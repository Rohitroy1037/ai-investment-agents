import { FiCopy, FiDownload, FiPrinter, FiShare2 } from "react-icons/fi";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * ActionButtons — Copy, Print, PDF Export, and Share buttons for analysis results.
 * @param {object} props
 * @param {React.RefObject} props.resultsRef — Ref to the results container for PDF capture.
 * @param {string} props.companyName — Company name for the filename.
 * @param {object} props.rawData — Raw results data for copy/share.
 */
const ActionButtons = ({ resultsRef, companyName, rawData }) => {

  // ── Copy Analysis as JSON ──
  const handleCopy = async () => {
    try {
      const text = JSON.stringify(rawData, null, 2);
      await navigator.clipboard.writeText(text);
      toast.success("Analysis copied to clipboard!");
    } catch {
      toast.error("Failed to copy.");
    }
  };

  // ── Print ──
  const handlePrint = () => {
    window.print();
  };

  // ── Export as PDF ──
  const handlePDF = async () => {
    if (!resultsRef?.current) return;
    const toastId = toast.loading("Generating PDF…");

    try {
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: "#0b0f1a",
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth - 20; // 10mm margin each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let y = 10;
      let remainingHeight = imgHeight;
      const pageHeight = pdf.internal.pageSize.getHeight() - 20;

      // Handle multi-page PDFs
      while (remainingHeight > 0) {
        pdf.addImage(imgData, "PNG", 10, y, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
        if (remainingHeight > 0) {
          pdf.addPage();
          y = -pageHeight + 10; // Offset for next page
        }
      }

      pdf.save(`${companyName.replace(/\s+/g, "_")}_Analysis.pdf`);
      toast.success("PDF downloaded!", { id: toastId });
    } catch (err) {
      toast.error("PDF generation failed.", { id: toastId });
      console.error(err);
    }
  };

  // ── Share ──
  const handleShare = async () => {
    const shareData = {
      title: `AI Investment Analysis: ${companyName}`,
      text: `Check out this AI-powered investment analysis for ${companyName}. Score: ${rawData?.investmentScore?.score ?? "N/A"}/100.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        toast.success("Share link copied to clipboard!");
      }
    } catch {
      // User cancelled share dialog
    }
  };

  const btnClass =
    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer border";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={handleCopy}
        className={`${btnClass} bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:text-white`}
      >
        <FiCopy size={14} /> Copy
      </button>
      <button
        onClick={handlePrint}
        className={`${btnClass} bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:text-white`}
      >
        <FiPrinter size={14} /> Print
      </button>
      <button
        onClick={handlePDF}
        className={`${btnClass} bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300`}
      >
        <FiDownload size={14} /> Export PDF
      </button>
      <button
        onClick={handleShare}
        className={`${btnClass} bg-violet-500/10 border-violet-500/20 text-violet-400 hover:bg-violet-500/20 hover:text-violet-300`}
      >
        <FiShare2 size={14} /> Share
      </button>
    </div>
  );
};

export default ActionButtons;
