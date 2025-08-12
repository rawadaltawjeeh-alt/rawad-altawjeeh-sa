import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX } from "react-icons/fi";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "src/lib/firebase";

type FeedbackProps = {
  sectionId: string;
  title?: string;
};

const Feedback: React.FC<FeedbackProps> = ({ sectionId, title }) => {
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "feedbacks"), {
        sectionId,
        message: comment,
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
      setComment("");
    } catch (err) {
      console.error("Error sending feedback:", err);
      alert("حدث خطأ أثناء إرسال الملاحظة، جرّب مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8 max-w-xl mx-auto">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-brand-500 text-white font-bold px-5 py-2 rounded-full shadow hover:bg-brand-600 transition flex items-center gap-2"
        >
          <FiMessageCircle />
          {/* أضف ملاحظة */}
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="p-4 bg-white rounded-xl shadow-md border border-gray-200"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-brand-700">
              {title || "ملاحظاتك على هذا القسم"}
            </h4>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-800">
              <FiX />
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <textarea
                placeholder="اكتب ملاحظتك هنا..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-brand-500"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-500 text-white px-4 py-2 rounded-md hover:bg-brand-600 transition"
              >
                {loading ? "جارٍ الإرسال..." : "إرسال الملاحظة"}
              </button>
            </form>
          ) : (
            <div className="text-green-600 font-medium">
              تم استلام ملاحظتك، شكرًا!
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Feedback;
