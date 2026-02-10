import { motion } from "framer-motion";
import certificate from "@/assets/certificate-amocrm.jpg";

export const CertificateSection = () => {
  return (
    <section className="py-24 bg-background" id="certificate">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">
            Официальный партнёр amoCRM
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            CRM82 — сертифицированный партнёр программы amoSTART компании amoCRM с 2018 года
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <img
            src={certificate}
            alt="Сертификат официального партнёра amoCRM — CRM82"
            className="rounded-xl card-shadow max-w-2xl w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};
