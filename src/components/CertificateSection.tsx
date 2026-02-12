import { useState } from "react";
import { X } from "lucide-react";
import certificateAmo from "@/assets/certificate-amocrm.jpg";
import certificateAmoWebp from "@/assets/certificate-amocrm.jpg?format=webp";
import certificateSipuni from "@/assets/certificate-sipuni-fixed.jpg";
import certificateSipuniWebp from "@/assets/certificate-sipuni-fixed.jpg?format=webp";
import certificateWazzup from "@/assets/certificate-wazzup-fixed.jpg";
import certificateWazzupWebp from "@/assets/certificate-wazzup-fixed.jpg?format=webp";
import { OptimizedImage } from "./OptimizedImage";
import { InView } from "./InView";

interface Certificate {
  src: string;
  webpSrc: string;
  alt: string;
  title: string;
}

const certificates: Certificate[] = [
  {
    src: certificateAmo,
    webpSrc: certificateAmoWebp,
    alt: "Сертификат официального партнёра amoCRM — CRM82",
    title: "amoCRM",
  },
  {
    src: certificateSipuni,
    webpSrc: certificateSipuniWebp,
    alt: "Сертификат партнёра Sipuni — CRM82",
    title: "Sipuni",
  },
  {
    src: certificateWazzup,
    webpSrc: certificateWazzupWebp,
    alt: "Сертификат партнёра Wazzup — CRM82",
    title: "Wazzup",
  },
];

export const CertificateSection = () => {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <>
      <section className="py-24 bg-background" id="certificate">
        <div className="container mx-auto px-4">
          <InView animation="anim-hidden-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 font-display">
              Сертифицированный партнёр
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              CRM82 — официальный партнёр ведущих сервисов для бизнеса
            </p>
          </InView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {certificates.map((cert, index) => (
              <InView
                key={cert.title}
                animation="anim-hidden-scale"
                className={`flex flex-col items-center cursor-pointer group anim-delay-${index + 1}`}
                onClick={() => setSelected(cert)}
              >
                <div className="w-full aspect-[4/3] rounded-xl card-shadow overflow-hidden bg-white">
                  <OptimizedImage
                    src={cert.src}
                    webpSrc={cert.webpSrc}
                    alt={cert.alt}
                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    width={400}
                    height={300}
                  />
                </div>
                <span className="mt-3 text-sm font-medium text-muted-foreground text-center">
                  {cert.title}
                </span>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4 cert-overlay"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-3xl w-full cert-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-3 -right-3 z-10 rounded-full bg-background p-2 card-shadow hover:bg-muted transition-colors"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
            <OptimizedImage
              src={selected.src}
              webpSrc={selected.webpSrc}
              alt={selected.alt}
              className="w-full rounded-xl card-shadow"
              width={800}
              height={600}
            />
          </div>
        </div>
      )}
    </>
  );
};
