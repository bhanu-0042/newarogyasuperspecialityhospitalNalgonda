import { Stethoscope, Heart, Brain, Baby, Eye, Activity, Smile, Syringe, UserPlus, Pill, Scissors, Bone } from "lucide-react";
import laparoscopy from "../assets/laparoscopy.png";
import dialysis from "../assets/dialysis.png";
import urology from "../assets/urology.png";
import paediatrics from "../assets/paediatrics.png";
import orthopaedics from "../assets/orthopaedics.png";

export interface Department {
    id: string;
    title: string;
    description: string;
    details: string;
    icon: any;
    image: string;
}

export const departments: Department[] = [
    {
        id: "critical-care",
        title: "Critical Care",
        description: "Emergency and intensive care for life-threatening conditions",
        details: "Our Critical Care unit is equipped to handle medical emergencies including snake bites and scorpion stings. We provide immediate life-saving interventions with 24/7 availability of anti-venom therapy, intensive monitoring, and expert medical support. Our team is specially trained in managing envenomation cases, ensuring rapid assessment, appropriate anti-venom administration, and comprehensive post-treatment care to prevent complications.",
        icon: Activity,
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: "general-medicine",
        title: "General Medicine",
        description: "Diagnosis and treatment of adult diseases",
        details: "Our General Medicine department provides comprehensive preventive, diagnostic, and curative medical services for all patients. We manage acute and chronic illnesses including diabetes, hypertension, and infectious diseases.",
        icon: Stethoscope,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: "laparoscopic-surgery",
        title: "Gen and Laproscopic Surgery",
        description: "Minimally invasive surgical procedures",
        details: "Specialized in performing general surgeries and advanced laparoscopic procedures (keyhole surgery) for rapid recovery and minimal scarring. We cover appendectomy, cholecystectomy, hernia repairs, and more.",
        icon: Scissors,
        image: laparoscopy,
    },
    {
        id: "orthopaedics",
        title: "Orthopaedics and Poly Trauma",
        description: "Bone, joint, and trauma care",
        details: "Expert care for musculoskeletal conditions, fractures, joint replacements, and sports injuries. Our poly trauma unit is equipped to handle multiple severe injuries with 24/7 emergency support.",
        icon: Bone,
        image: orthopaedics,
    },
    {
        id: "cardiology",
        title: "Cardiology",
        description: "Heart and cardiovascular health",
        details: "State-of-the-art cardiac care including diagnostics, non-invasive cardiology, and interventional procedures for heart conditions.",
        icon: Heart,
        image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: "urology",
        title: "Urology",
        description: "Urinary tract and male reproductive system",
        details: "Treatment for kidney stones, urinary tract infections, prostate issues, and other urological conditions.",
        icon: Activity,
        image: urology,
    },
    {
        id: "nephrology",
        title: "Nephrology",
        description: "Kidney care and dialysis",
        details: "Specialized care for kidney diseases, hypertension, and dialysis services for patients with renal failure.",
        icon: Activity,
        image: "https://images.unsplash.com/photo-1578496479763-c21c718af028?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: "dialysis",
        title: "Dialysis",
        description: "Life-saving kidney support",
        details: "Advanced dialysis unit providing safe and comfortable haemodialysis for patients with end-stage renal disease.",
        icon: Syringe,
        image: dialysis,
    },
    {
        id: "neurology",
        title: "Neurology",
        description: "Brain and nervous system disorders",
        details: "Diagnosis and treatment of neurological conditions such as stroke, epilepsy, migraines, and neurodegenerative disorders.",
        icon: Brain,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: "paediatrics",
        title: "Paediatrics",
        description: "Medical care for infants, children, and adolescents",
        details: "Compassionate care for your little ones, ranging from newborn screenings and vaccinations to treatment of childhood illnesses and developmental monitoring.",
        icon: Baby,
        image: paediatrics,
    },
    {
        id: "gynaecology",
        title: "Gynaecology and OBG",
        description: "Women's reproductive health and childbirth",
        details: "Comprehensive care for women at every stage of life, including prenatal care, high-risk pregnancy management, infertility treatments, and gynecological surgeries.",
        icon: UserPlus,
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: "ophthalmology",
        title: "Ophthalmology",
        description: "Eye care and surgery",
        details: "Complete eye care services including vision testing, cataract surgery, glaucoma treatment, and management of retinal disorders.",
        icon: Eye,
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: "ent",
        title: "ENT",
        description: "Ear, Nose, and Throat care",
        details: "Diagnosis and treatment of disorders related to the ear, nose, throat, head, and neck, including allergies, sinusitis, and hearing loss.",
        icon: Activity,
        image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: "dermatology",
        title: "Dermatology",
        description: "Skin, hair, and nail conditions",
        details: "Advanced skincare treatments for acne, eczema, psoriasis, and cosmetic dermatology services to help you look and feel your best.",
        icon: Smile,
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: "dental",
        title: "Dental & OMFS",
        description: "Dental and Oral Maxillofacial Surgery",
        details: "Complete dental care including cleanings, fillings, root canals, and specialized oral surgeries for facial trauma and jaw disorders.",
        icon: Smile,
        image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: "pulmonology",
        title: "Pulmonology",
        description: "Respiratory system health",
        details: "Expert management of lung conditions like asthma, COPD, pneumonia, and sleep apnea, ensuring you breathe easier.",
        icon: Activity,
        image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: "gastroenterology",
        title: "Gastroenterology",
        description: "Digestive system health",
        details: "Comprehensive care for digestive disorders involving the stomach, intestines, liver, and pancreas, including endoscopy services.",
        icon: Pill,
        image: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: "oncology",
        title: "Oncology",
        description: "Cancer treatment and care",
        details: "Holistic cancer care including screenings, chemotherapy, and palliative care, supporting patients through their journey.",
        icon: Activity,
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: "plastic-surgery",
        title: "Plastic Surgery",
        description: "Reconstructive and cosmetic surgery",
        details: "Restoring form and function through reconstructive surgeries for trauma or burns, as well as cosmetic procedures.",
        icon: Scissors,
        image: "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?auto=format&fit=crop&q=80&w=2070",
    },
];
