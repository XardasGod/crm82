import { motion } from "framer-motion";
import certificateAmo from "@/assets/certificate-amocrm.jpg";
import certificateSipuni from "@/assets/certificate-sipuni.jpg";
import certificateWazzup from "@/assets/certificate-wazzup.jpg";

const certificates = [
  {
    src: certificateAmo,
    alt: "Сертификат официального партнёра amoCRM — CRM82",
    title: "amoCRM",
  },
  {
    src: certificateSipuni,
    alt: "Сертификат партнёра Сипуни — CRM82",
    title: "Сипуни",
  },
  {
    src: certificateWazzup,
    alt: "Сертификат партнёра Wazzup — CRM82",
    title: "Wazzup",
  },
];

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
            Сертифицированный партнёр
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            CRM82 — официальный партнёр ведущих сервисов для бизнеса
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center"
            >
              <img
                src={cert.src}
                alt={cert.alt}
                className="rounded-xl card-shadow w-full"
              />
              <span className="mt-3 text-sm font-medium text-muted-foreground">
                {cert.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
