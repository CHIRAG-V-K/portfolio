import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { ChevronRight } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { SocialMediaIcons } from ".";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const notify = (message) => toast(message);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_e9z628l",
        "template_tucjbxq",
        {
          from_name: form.name,
          to_name: "Chirag V K",
          reply_to: form.email,
          to_email: "chirag.v.k2@gmail.com",
          message: form.message,
        },
        "3VvsecN6EB0OEX250",
      )
      .then(
        () => {
          setLoading(false);
          notify("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          notify("Ahh, something went wrong. Please try again.");
        },
      );
  };
  return (
    <motion.div
      variants={slideIn("left", "tween", 0, 0.5)}
      className="w-full flex flex-col items-start justify-center"
    >
      <div className=" p-5 bg-gray-300 flex flex-col items-center justify-center gap-5 rounded-md border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(50,50,50,1)]">
        <div className="grid grid-cols-3">
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <p className="font-bold text-xl text-gray-800 self-start">
              Contact Me,
              <span className="font-semibold text-lg text-gray-600 block">
                through any of these!!
              </span>
            </p>
            <SocialMediaIcons />
          </div>

          <div class=" text-base font-semibold text-gray-800 flex flex-col items-center justify-center  ">
            <span>--- OR ---</span>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-5 ">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center justify-center gap-5"
            >
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="w-full h-10 rounded-md border-2 border-gray-800 bg-white shadow-[4px_4px_0px_0px_rgba(50,50,50,1)] text-sm font-semibold text-gray-800 px-2.5 outline-none focus:border-blue-500
          transition-all duration-300"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your mail address?"
                className="w-full h-10 rounded-md border-2 border-gray-800 bg-white shadow-[4px_4px_0px_0px_rgba(50,50,50,1)] text-sm font-semibold text-gray-800 px-2.5 outline-none focus:border-blue-500 transition-all duration-300"
              />

              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                className="w-full h-20 rounded-md border-2 border-gray-800 bg-white shadow-[4px_4px_0px_0px_rgba(50,50,50,1)] text-sm font-semibold text-gray-800 px-2.5 py-1.5 outline-none focus:border-blue-500 resize-none transition-all duration-300"
              />

              <button className="oauthButton flex justify-center items-center gap-1.5 w-full h-10 rounded-md border-2 border-gray-800 bg-white shadow-[4px_4px_0px_0px_rgba(50,50,50,1)] text-base font-semibold text-gray-800 cursor-pointer transition-all duration-250 relative overflow-hidden z-[1] hover:text-gray-200">
                <span className="relative z-10">
                  {loading ? "Sending..." : "Send"}
                </span>
                <ChevronRight className="w-6 h-6 relative z-10" />
              </button>
            </form>
          </div>
        </div>

        <style jsx>{`
          .oauthButton::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0;
            background-color: #212121;
            z-index: -1;
            box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
            transition: all 250ms;
          }
          .oauthButton:hover::before {
            width: 100%;
          }
        `}</style>
      </div>
    </motion.div>
  );
};

export default ContactUs;
// export default SectionWrapper(ContactUs, "contactus");
