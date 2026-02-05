// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Optimized Scroll Handler with Throttling
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');
const header = document.getElementById('header');
const hero = document.querySelector('.hero');

// Throttle function for performance optimization
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// Single scroll handler for all scroll-related functionality
function handleScroll() {
    const scrollY = window.pageYOffset;

    // Header scroll effect
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Active navigation link tracking
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Smooth parallax effect for hero using requestAnimationFrame
    if (hero && scrollY < hero.offsetHeight) {
        requestAnimationFrame(() => {
            hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        });
    }
}

// Attach single throttled scroll listener
window.addEventListener('scroll', throttle(handleScroll, 16)); // ~60fps

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// Fade-in Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Contact Form Handling with Web3Forms
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check if access key is set
        const accessKey = contactForm.querySelector('[name="access_key"]').value;
        if (accessKey === 'YOUR_ACCESS_KEY_HERE') {
            if (formStatus) {
                formStatus.style.display = 'block';
                formStatus.style.color = '#f59e0b';
                formStatus.innerHTML = '⚠️ Please configure Web3Forms access key. Visit <a href="https://web3forms.com" target="_blank">web3forms.com</a> to get your free key.';
            }
            return;
        }

        const submitButton = contactForm.querySelector('[type="submit"]');
        const originalButtonText = submitButton.textContent;

        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            const formData = new FormData(contactForm);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                if (formStatus) {
                    formStatus.style.display = 'block';
                    formStatus.style.color = '#10b981';
                    formStatus.textContent = '✓ Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
                }
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            if (formStatus) {
                formStatus.style.display = 'block';
                formStatus.style.color = '#ef4444';
                formStatus.textContent = '✗ There was an error sending your message. Please try again or contact us directly.';
            }
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// Download Catalog Button
const downloadCatalogBtn = document.getElementById('downloadCatalog');
if (downloadCatalogBtn) {
    downloadCatalogBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('📄 Product Catalog\n\nTo receive our complete product catalog:\n\n1. Contact us via WhatsApp: +212 667 078 656\n2. Email: engrais@hourmaintenance.com\n3. Or fill out the contact form below\n\nWe\'ll send you our latest PDF catalog within 24 hours!');
    });
}

// Prevent form submission if spam (honeypot technique - optional)
// You can add this to your HTML form: <input type="text" name="website" style="display:none">
// Then check if it's filled (bots usually fill all fields)

// Language Translations
const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_products: "Products",
        nav_faq: "F.A.Q",
        nav_contact: "Contact",

        hero_title: "Welcome to Engrais Hour Maintenance",
        hero_subtitle: "Your trusted partner for premium agricultural solutions in Conakry, Guinea",
        btn_products: "View All Products",
        btn_contact: "Contact Us",

        values_title: "Our Values",
        val_quality_title: "Quality",
        val_quality_desc: "We are committed to delivering only the highest quality products that meet international standards and exceed customer expectations.",
        val_consistency_title: "Consistency",
        val_consistency_desc: "Our reliable supply chain ensures consistent product availability and dependable service you can count on year-round.",
        val_performance_title: "Performance",
        val_performance_desc: "We provide effective agricultural solutions that deliver measurable results and help your business thrive and grow.",

        about_title: "About Us",
        about_subtitle: "Leading Agricultural Solutions in Guinea",
        about_text_1: "Engrais Hour Maintenance is a premier provider of agricultural chemicals, fertilizers, and consulting services based in Conakry, Guinea. With a commitment to excellence and sustainability, we serve farmers, agricultural businesses, and industrial clients across the region.",
        about_text_2: "Our extensive product portfolio includes high-quality fertilizers, crop protection products, animal nutrition solutions, and specialized chemicals. We work closely with our clients to understand their unique needs and provide tailored solutions that drive productivity and profitability.",
        about_text_3: "Backed by a team of experienced professionals and strong partnerships with leading global manufacturers, we ensure that our customers receive only the best products accompanied by expert technical support and reliable service.",

        products_title: "Our Products",
        prod_fert_title: "Fertilizers & Minerals",
        prod_fert_desc: "Premium quality fertilizers and mineral supplements to enhance soil fertility and maximize crop yields.",
        prod_feed_title: "Animal Feed & Nutrition",
        prod_feed_desc: "Comprehensive range of nutritional products for livestock, poultry, and aquaculture operations.",
        prod_chem_title: "Chemical Products & Additives",
        prod_chem_desc: "Industrial chemicals and food additives meeting stringent quality and safety standards.",
        prod_grain_title: "Grains, Wheat & Sugar",
        prod_grain_desc: "High-quality grains, wheat, sugar, and related agricultural commodities for various applications.",
        prod_crop_title: "Crop Protection Solutions",
        prod_crop_desc: "Advanced crop protection products to safeguard your investment and ensure healthy harvests.",
        prod_dairy_title: "Dairy & Specialty Products",
        prod_dairy_desc: "Dairy ingredients and specialty agricultural products for food processing and manufacturing.",
        btn_learn_more: "Learn More",
        btn_request_quote: "Request Quote",

        products_page_title: "Our Product Catalog",
        products_page_subtitle: "Premium quality chemicals for industry and agriculture",

        cat_filter_title: "Categories",
        cat_fertilizers: "Fertilizers & Nutrients",
        cat_animal_feed: "Animal Feed",
        cat_industrial: "Industrial Chemicals",
        cat_polymers: "Polymers & Resins",
        cat_waxes: "Waxes & Oils",
        cat_minerals: "Minerals & Salts",
        cat_dyes: "Dyes & Surfactants",

        // Fertilizers
        prod_urea_title: "Urea 46%",
        prod_urea_details: "Granular / Prilled | N: 46%",
        prod_npk_title: "NPK Complex",
        prod_npk_details: "15-15-15 / 20-10-10",
        prod_dap_title: "Diammonium Phosphate (DAP)",
        prod_dap_details: "18-46-0",
        prod_map_title: "Monoammonium Phosphate (MAP)",
        prod_map_details: "12-61-0 (Water Soluble)",
        prod_mop_title: "Potassium Chloride (MOP)",
        prod_mop_details: "White / Red Granular",
        prod_ams_title: "Ammonium Sulfate",
        prod_ams_details: "Crystalline / Granular",
        prod_mags_title: "Magnesium Sulfate",
        prod_mags_details: "Heptahydrate (Epsom)",
        prod_pn_title: "Potassium Nitrate",
        prod_pn_details: "NOP 13-0-46",

        // Animal Feed
        prod_corn_title: "Whole Yellow Corn",
        prod_corn_details: "Grade 1 & 2",
        prod_soya_title: "Soybean Meal",
        prod_soya_details: "Protein 46-48%",
        prod_fish_title: "Fish Meal",
        prod_fish_details: "Steam Dried 65%",
        prod_wheat_title: "Wheat Bran",
        prod_wheat_details: "Pelletized / Flakes",
        prod_sugar_title: "White Sugar",
        prod_sugar_details: "ICUMSA 45",
        prod_rice_title: "White Rice",
        prod_rice_details: "Long / Broken / Parboiled",

        // Industrial
        prod_ammonia_title: "Ammonia (Anhydrous)",
        prod_ammonia_details: "Refrigerant Grade | 99.9%",
        prod_caustic_title: "Caustic Soda",
        prod_caustic_details: "Flakes / Pearls 99%",
        prod_phos_title: "Phosphoric Acid",
        prod_phos_details: "Food / Tech Grade 85%",
        prod_methanol_title: "Methanol",
        prod_methanol_details: "Purity > 99.85%",
        prod_sodsulf_title: "Sodium Sulfide",
        prod_sodsulf_details: "Flakes 60%",

        // Polymers
        prod_hdpe_title: "HDPE Granules",
        prod_hdpe_details: "Injection / Blow Molding",
        prod_pvc_title: "PVC Resin",
        prod_pvc_details: "Suspension Grade SG5",
        prod_ldpe_title: "LDPE Granules",
        prod_ldpe_details: "Film Grade",
        prod_pet_title: "PET Resin",
        prod_pet_details: "Bottle Grade",

        // Waxes
        prod_paraffin_title: "Paraffin Wax",
        prod_paraffin_details: "Fully Refined | CAS: 8002-74-2",
        prod_jelly_title: "Petroleum Jelly",
        prod_jelly_details: "USP White / Yellow",
        prod_baseoil_title: "Base Oil",
        prod_baseoil_details: "SN 150 / SN 500",

        // Minerals
        prod_chromium_title: "Chromium Sulfate",
        prod_chromium_details: "Basic (BCS) 24-26%",
        prod_dicopper_title: "Dicopper Pyrophosphate",
        prod_dicopper_details: "Formula: Cu₂P₂O₇",
        prod_copper_title: "Copper(II) Oxide",
        prod_copper_details: "Black Powder 98%",
        prod_zinc_title: "Zinc Oxide",
        prod_zinc_details: "Rubber / Paint Grade",

        // Dyes
        prod_sles_title: "SLES 70%",
        prod_sles_details: "Sodium Lauryl Ether Sulfate",
        prod_sulphur_title: "Sulphur Black",
        prod_sulphur_details: "BR 200% / 240%",

        faq_title: "Frequently Asked Questions",
        faq_q1: "Are your products certified for quality and safety?",
        faq_a1: "Yes, all our products meet international quality and safety standards. We work with certified manufacturers and conduct rigorous quality control checks to ensure that every product meets the highest standards before reaching our customers.",
        faq_q2: "Do you offer discounts for bulk or repeat orders?",
        faq_a2: "Absolutely! We value our long-term partners and offer competitive pricing for bulk orders and repeat customers. Contact us to discuss your specific requirements and receive a customized quote.",
        faq_q3: "How do you ensure product freshness and quality during delivery?",
        faq_a3: "We maintain strict storage conditions and use reliable logistics partners to ensure products are transported under optimal conditions. Our packaging is designed to preserve product integrity throughout the supply chain.",
        faq_q4: "What payment methods do you accept?",
        faq_a4: "We accept various payment methods including bank transfers, letters of credit, and other secure payment options. Our team will work with you to arrange a payment method that suits your business needs.",
        faq_q5: "What is your return policy?",
        faq_a5: "Customer satisfaction is our priority. If you receive a defective product or have concerns about quality, please contact us within 7 days of delivery. We will investigate the issue and provide an appropriate resolution.",
        faq_q6: "Do you supply to both businesses and individuals?",
        faq_a6: "Yes, we serve a diverse customer base including agricultural businesses, industrial clients, and individual farmers. Regardless of order size, we are committed to providing excellent service to all our customers.",
        faq_q7: "Do you offer delivery or shipping services?",
        faq_a7: "Yes, we provide delivery services throughout Guinea and can arrange international shipping for export orders. Delivery times and costs vary based on location and order size.",
        faq_q8: "How do I track my order?",
        faq_a8: "Once your order is confirmed and dispatched, we will provide you with tracking information via email or WhatsApp. You can also contact our customer service team anytime for updates on your order status.",

        contact_title: "Contact Us",
        form_title: "Leave Us A Message",
        form_name_label: "Name *",
        form_name_ph: "Your name",
        form_email_label: "Email *",
        form_email_ph: "your.email@example.com",
        form_phone_label: "Phone",
        form_phone_ph: "+224 XXX XXX XXX",
        form_message_label: "Message *",
        form_message_ph: "Tell us how we can help you...",
        btn_send: "Send Message",

        get_touch_title: "Get In Touch",
        contact_addr_label: "Address",
        contact_phone_label: "Phone",
        contact_email_label: "Email",
        contact_whatsapp_label: "WhatsApp"
    },
    fr: {
        nav_home: "Accueil",
        nav_about: "À Propos",
        nav_products: "Produits",
        nav_faq: "FAQ",
        nav_contact: "Contact",

        hero_title: "Bienvenue chez Engrais Hour Maintenance",
        hero_subtitle: "Votre partenaire de confiance pour des solutions agricoles premium à Conakry, Guinée",
        btn_products: "Voir Nos Produits",
        btn_contact: "Contactez-nous",

        values_title: "Nos Valeurs",
        val_quality_title: "Qualité",
        val_quality_desc: "Nous nous engageons à fournir uniquement des produits de la plus haute qualité qui respectent les normes internationales et dépassent les attentes des clients.",
        val_consistency_title: "Cohérence",
        val_consistency_desc: "Notre chaîne d'approvisionnement fiable garantit une disponibilité constante des produits et un service sur lequel vous pouvez compter toute l'année.",
        val_performance_title: "Performance",
        val_performance_desc: "Nous fournissons des solutions agricoles efficaces qui donnent des résultats mesurables et aident votre entreprise à prospérer et à se développer.",

        about_title: "À Propos de Nous",
        about_subtitle: "Solutions Agricoles Leaders en Guinée",
        about_text_1: "Engrais Hour Maintenance est un fournisseur de premier plan de produits chimiques agricoles, d'engrais et de services de conseil basé à Conakry, en Guinée. Avec un engagement envers l'excellence et la durabilité, nous servons les agriculteurs, les entreprises agricoles et les clients industriels de la région.",
        about_text_2: "Notre vaste portefeuille de produits comprend des engrais de haute qualité, des produits de protection des cultures, des solutions de nutrition animale et des produits chimiques spécialisés. Nous travaillons en étroite collaboration avec nos clients pour comprendre leurs besoins uniques et fournir des solutions sur mesure qui stimulent la productivité et la rentabilité.",
        about_text_3: "Soutenus par une équipe de professionnels expérimentés et des partenariats solides avec les principaux fabricants mondiaux, nous veillons à ce que nos clients reçoivent uniquement les meilleurs produits accompagnés d'un support technique expert et d'un service fiable.",

        products_title: "Nos Produits",
        prod_fert_title: "Engrais & Minéraux",
        prod_fert_desc: "Engrais et suppléments minéraux de qualité supérieure pour améliorer la fertilité des sols et maximiser les rendements des cultures.",
        prod_feed_title: "Alimentation Animale",
        prod_feed_desc: "Gamme complète de produits nutritionnels pour le bétail, la volaille et les opérations aquacoles.",
        prod_chem_title: "Produits Chimiques & Additifs",
        prod_chem_desc: "Produits chimiques industriels et additifs alimentaires conformes aux normes de qualité et de sécurité les plus strictes.",
        prod_grain_title: "Céréales, Blé & Sucre",
        prod_grain_desc: "Céréales, blé, sucre et produits agricoles connexes de haute qualité pour diverses applications.",
        prod_crop_title: "Protection des Cultures",
        prod_crop_desc: "Produits avancés de protection des cultures pour protéger votre investissement et assurer des récoltes saines.",
        prod_dairy_title: "Produits Laitiers & Spécialités",
        prod_dairy_desc: "Ingrédients laitiers et produits agricoles spécialisés pour la transformation alimentaire et la fabrication.",
        btn_learn_more: "En Savoir Plus",
        btn_request_quote: "Demander un Devis",

        products_page_title: "Notre Catalogue de Produits",
        products_page_subtitle: "Produits chimiques de première qualité pour l'industrie et l'agriculture",

        cat_filter_title: "Catégories",
        cat_fertilizers: "Engrais & Nutriments",
        cat_animal_feed: "Alimentation Animale",
        cat_industrial: "Chimie Industrielle",
        cat_polymers: "Polymères & Résines",
        cat_waxes: "Cires & Huiles",
        cat_minerals: "Minéraux & Sels",
        cat_dyes: "Colorants & Tensioactifs",

        // Fertilizers (FR)
        prod_urea_title: "Urée 46%",
        prod_urea_details: "Granulaire / Prillé | N: 46%",
        prod_npk_title: "Complexe NPK",
        prod_npk_details: "15-15-15 / 20-10-10",
        prod_dap_title: "Phosphate Diammonique (DAP)",
        prod_dap_details: "18-46-0",
        prod_map_title: "Phosphate Monoammonique (MAP)",
        prod_map_details: "12-61-0 (Soluble)",
        prod_mop_title: "Chlorure de Potasse (MOP)",
        prod_mop_details: "Blanc / Rouge Granulaire",
        prod_ams_title: "Sulfate d'Ammonium",
        prod_ams_details: "Cristallin / Granulaire",
        prod_mags_title: "Sulfate de Magnésium",
        prod_mags_details: "Heptahydrate (Epsom)",
        prod_pn_title: "Nitrate de Potassium",
        prod_pn_details: "NOP 13-0-46",

        // Animal Feed (FR)
        prod_corn_title: "Maïs Jaune Entier",
        prod_corn_details: "Grade 1 & 2",
        prod_soya_title: "Tourteau de Soja",
        prod_soya_details: "Protéine 46-48%",
        prod_fish_title: "Farine de Poisson",
        prod_fish_details: "Séchée Vapeur 65%",
        prod_wheat_title: "Son de Blé",
        prod_wheat_details: "Pellets / Flocons",
        prod_sugar_title: "Sucre Blanc",
        prod_sugar_details: "ICUMSA 45",
        prod_rice_title: "Riz Blanc",
        prod_rice_details: "Long / Brisé / Étuvé",

        // Industrial (FR)
        prod_ammonia_title: "Ammoniac (Anhydre)",
        prod_ammonia_details: "Qualité Réfrigérant | 99.9%",
        prod_caustic_title: "Soude Caustique",
        prod_caustic_details: "Écailles / Perles 99%",
        prod_phos_title: "Acide Phosphorique",
        prod_phos_details: "Alimentaire / Technique 85%",
        prod_methanol_title: "Méthanol",
        prod_methanol_details: "Pureté > 99.85%",
        prod_sodsulf_title: "Sulfure de Sodium",
        prod_sodsulf_details: "Écailles 60%",

        // Polymers (FR)
        prod_hdpe_title: "Granulés PEHD",
        prod_hdpe_details: "Injection / Soufflage",
        prod_pvc_title: "Résine PVC",
        prod_pvc_details: "Suspension Grade SG5",
        prod_ldpe_title: "Granulés PEBD",
        prod_ldpe_details: "Grade Film",
        prod_pet_title: "Résine PET",
        prod_pet_details: "Grade Bouteille",

        // Waxes (FR)
        prod_paraffin_title: "Cire de Paraffine",
        prod_paraffin_details: "Entièrement Raffinée",
        prod_jelly_title: "Vaseline (Petroleum Jelly)",
        prod_jelly_details: "USP Blanche / Jaune",
        prod_baseoil_title: "Huile de Base",
        prod_baseoil_details: "SN 150 / SN 500",

        // Minerals (FR)
        prod_chromium_title: "Sulfate de Chrome",
        prod_chromium_details: "Basique (BCS) 24-26%",
        prod_dicopper_title: "Pyrophosphate de Cuivre",
        prod_dicopper_details: "Formule : Cu₂P₂O₇",
        prod_copper_title: "Oxyde de Cuivre(II)",
        prod_copper_details: "Poudre Noire 98%",
        prod_zinc_title: "Oxyde de Zinc",
        prod_zinc_details: "Grade Caoutchouc/Peinture",

        // Dyes (FR)
        prod_sles_title: "SLES 70%",
        prod_sles_details: "Lauryl éther sulfate de sodium",
        prod_sulphur_title: "Noir de Soufre",
        prod_sulphur_details: "BR 200% / 240%",

        faq_title: "Questions Fréquentes",
        faq_q1: "Vos produits sont-ils certifiés pour la qualité et la sécurité ?",
        faq_a1: "Oui, tous nos produits répondent aux normes internationales de qualité et de sécurité. Nous travaillons avec des fabricants certifiés et effectuons des contrôles de qualité rigoureux pour garantir que chaque produit répond aux normes les plus élevées avant d'atteindre nos clients.",
        faq_q2: "Offrez-vous des réductions pour les commandes en gros ?",
        faq_a2: "Absolument ! Nous valorisons nos partenaires à long terme et proposons des prix compétitifs pour les commandes en gros et les clients réguliers. Contactez-nous pour discuter de vos besoins spécifiques et recevoir un devis personnalisé.",
        faq_q3: "Comment assurez-vous la fraîcheur et la qualité pendant la livraison ?",
        faq_a3: "Nous maintenons des conditions de stockage strictes et utilisons des partenaires logistiques fiables pour garantir que les produits sont transportés dans des conditions optimales. Nos emballages sont conçus pour préserver l'intégrité du produit tout au long de la chaîne d'approvisionnement.",
        faq_q4: "Quelles méthodes de paiement acceptez-vous ?",
        faq_a4: "Nous acceptons diverses méthodes de paiement, y compris les virements bancaires, les lettres de crédit et d'autres options de paiement sécurisées. Notre équipe travaillera avec vous pour organiser une méthode de paiement adaptée aux besoins de votre entreprise.",
        faq_q5: "Quelle est votre politique de retour ?",
        faq_a5: "La satisfaction du client est notre priorité. Si vous recevez un produit défectueux ou si vous avez des inquiétudes concernant la qualité, veuillez nous contacter dans les 7 jours suivant la livraison. Nous examinerons le problème et fournirons une résolution appropriée.",
        faq_q6: "Fournissez-vous aux entreprises et aux particuliers ?",
        faq_a6: "Oui, nous servons une clientèle diversifiée comprenant des entreprises agricoles, des clients industriels et des agriculteurs individuels. Quelle que soit la taille de la commande, nous nous engageons à fournir un excellent service à tous nos clients.",
        faq_q7: "Offrez-vous des services de livraison ou d'expédition ?",
        faq_a7: "Oui, nous assurons des services de livraison dans toute la Guinée et pouvons organiser l'expédition internationale pour les commandes d'exportation. Les délais et les coûts de livraison varient en fonction de l'emplacement et de la taille de la commande.",
        faq_q8: "Comment puis-je suivre ma commande ?",
        faq_a8: "Une fois votre commande confirmée et expédiée, nous vous fournirons les informations de suivi par e-mail ou WhatsApp. Vous pouvez également contacter notre service client à tout moment pour obtenir des mises à jour sur le statut de votre commande.",

        contact_title: "Contactez-nous",
        form_title: "Laissez-nous un message",
        form_name_label: "Nom *",
        form_name_ph: "Votre nom",
        form_email_label: "Email *",
        form_email_ph: "votre.email@exemple.com",
        form_phone_label: "Téléphone",
        form_phone_ph: "+224 XXX XXX XXX",
        form_message_label: "Message *",
        form_message_ph: "Dites-nous comment nous pouvons vous aider...",
        btn_send: "Envoyer le Message",

        get_touch_title: "Entrer en Contact",
        contact_addr_label: "Adresse",
        contact_phone_label: "Téléphone",
        contact_email_label: "Email",
        contact_whatsapp_label: "WhatsApp"
    }
};

// Language Handling
let currentLang = localStorage.getItem('site_lang') || 'en';
const langToggle = document.getElementById('languageToggle');

function updateContent(lang) {
    // Update button text
    langToggle.textContent = lang === 'en' ? 'FR' : 'EN';

    // Update all text elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Save preference
    localStorage.setItem('site_lang', lang);
    currentLang = lang;

    // Update html lang attribute
    document.documentElement.lang = lang;
}

// Initial update
updateContent(currentLang);

// Toggle Event
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'fr' : 'en';
        updateContent(newLang);
    });
}

// Back to Top Button Functionality
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

console.log('Agrochemicals Consulting Website Loaded Successfully! 🌱');
