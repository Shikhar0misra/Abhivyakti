import { motion } from "framer-motion";
import theatreMasks from "@/assets/theatre-masks.png";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative border-t grain-overlay"
      style={{
        borderColor: "hsl(var(--border))",
        background: "hsl(0 0% 3%)",  // fully opaque near-black
      }}
    >
      {/* Top gold accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #c8960c 30%, #e8b422 50%, #c8960c 70%, transparent)" }}
      />

      <div className="container mx-auto px-6 pt-16 pb-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 items-start">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img src={theatreMasks} alt="Logo" className="w-9 h-9" />
              <span className="font-heading text-xl font-bold text-foreground">Abhivyakti</span>
            </div>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              Drama Society — JIIT 128<br />
              Where expression meets artistry.
            </p>
            <p className="text-muted-foreground/50 font-body text-xs mt-3 italic">
              "The play's the thing."
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-heading text-sm font-semibold text-foreground mb-5 tracking-widest uppercase" style={{ color: "#c8960c" }}>
              Navigate
            </h4>
            <div className="space-y-3">
              {[
                { label: "Home", id: "home" },
                { label: "Ilhaam Events", id: "ilhaam" },
                { label: "Event Gallery", id: "ilhaam" },
                { label: "About Us", id: "about" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })}
                  className="block text-muted-foreground font-body text-sm hover:text-foreground transition-colors group"
                >
                  <span className="inline-block w-0 overflow-hidden group-hover:w-3 transition-all duration-200 text-primary mr-0 group-hover:mr-1">›</span>
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-heading text-sm font-semibold mb-5 tracking-widest uppercase" style={{ color: "#c8960c" }}>
              Connect
            </h4>
            <div className="space-y-4">
              <a
                href="https://instagram.com/abhivyakti_jiit128"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground font-body text-sm hover:text-foreground transition-colors group"
              >
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <span>@abhivyakti_jiit128</span>
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground font-body text-sm hover:text-foreground transition-colors group"
              >
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid hsl(var(--border))" }}>
          <p className="text-muted-foreground font-body text-xs">
            © 2026 Abhivyakti Drama Society, JIIT 128. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {["●", "●", "●"].map((dot, i) => (
              <span key={i} className="text-[6px]" style={{ color: i === 1 ? "#c8960c" : "hsl(var(--muted-foreground))" }}>{dot}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
