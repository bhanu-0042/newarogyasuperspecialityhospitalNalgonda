import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Clock, User, Calendar } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const posts = [
    {
        id: 1,
        title: "The Importance of Regular Checkups",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2070",
        category: "General Health",
        date: "Jan 15, 2024",
        author: "Dr. Sarah Johnson",
        readTime: "12 min read",
        content: `
      Regular health checkups are essential for maintaining a healthy lifestyle and preventing potential health issues before they become serious. Many people only visit a doctor when they feel ill, but preventive care is the cornerstone of modern medicine and the key to long-term vitality.

      ### The Philosophy of Preventive Medicine
      Preventive medicine focuses on the health of individuals, communities, and defined populations. Its goal is to protect, promote, and maintain health and well-being and to prevent disease, disability, and death. At Arogya Hospital, we believe that staying ahead of illness is far more effective than just treating it after it appears.

      ### Why are regular checkups critically important?
      1. **Early Detection of "Silent Killers"**: Many serious conditions like hypertension (high blood pressure), type 2 diabetes, and high cholesterol often show no symptoms in their early stages. By the time symptoms appear, significant damage may have already occurred. Regular screenings allow for early intervention.
      2. **Cancer Screening and Prevention**: Regular checkups include age-appropriate cancer screenings (such as mammograms, Pap smears, or colonoscopies). Early detection of cancer significantly increases the chances of successful treatment and survival.
      3. **Updating Vaccinations**: Immunization isn't just for children. Adults need periodic boosters for tetanus and diphtheria, as well as annual flu shots and other vaccines based on age and health status.
      4. **Establishing a Health Baseline**: Regular visits allow you and your doctor to establish what "normal" looks like for you. Having a history of your vitals (blood pressure, heart rate, weight) makes it much easier to spot even subtle changes that might indicate a problem.
      
      ### What to expect during a comprehensive checkup at Arogya?
      A thorough wellness visit typically involves several key components:
      * **Medical History Review**: Your doctor will ask about your current health, any symptoms you're experiencing, your family's medical history, and your lifestyle habits (diet, exercise, smoking, alcohol).
      * **Physical Examination**: This includes checking your height, weight, blood pressure, heart rate, and respiration rate. Your doctor will also listen to your heart and lungs and examine your skin, throat, and abdomen.
      * **Laboratory Tests**: Depending on your age, gender, and risk factors, your doctor might order blood tests (CBC, lipid profile, blood sugar), urine analysis, or specialized diagnostic tests like ECGs or bone density scans.
      * **Mental Health Assessment**: It's just as important to discuss your emotional well-being. Doctors can screen for depression, anxiety, and stress-related issues.

      ### Frequency of Visits
      While the "annual physical" is a common standard, the frequency of your checkups depends on your age, overall health, and risk factors:
      * **Healthy Adults under 40**: Generally recommended every 2-3 years.
      * **Adults aged 40-60**: Annually is best to monitor changes related to aging.
      * **Seniors (65+)**: Often require more frequent visits, ranging from twice a year to quarterly, depending on managed conditions.

      Investing a small amount of time in regular check-ups can lead to a longer, healthier life. Your health is your most valuable asset. Don't wait for symptoms to appear—schedule your comprehensive wellness visit today at Arogya Hospital.
    `
    },
    {
        id: 2,
        title: "Managing Winter Allergies: Expert Tips",
        image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=2070",
        category: "Pediatrics",
        date: "Dec 10, 2023",
        author: "Dr. Robert Smith",
        readTime: "10 min read",
        content: `
      While we often associate allergies with spring flowers and autumn ragweed, the winter months bring their own unique set of indoor triggers. As temperatures drop and we spend more time inside with the heat turned up and windows closed, certain allergens can become highly concentrated, leading to persistent symptoms.

      ### Understanding Winter Allergy Triggers
      Indoor allergens are the primary culprits during the cold season. Unlike outdoor pollen, these are often present year-round but become much more problematic in winter:
      * **Dust Mites**: These microscopic organisms thrive in warm, humid environments. They are most commonly found in bedding, upholstered furniture, and carpets. When the furnace turns on, it can stir up dust containing mite waste.
      * **Pet Dander**: Even if you're not typically allergic to your pets, spending 24/7 indoors with them increases your exposure to their skin cells (dander) and saliva, which can trigger reactions.
      * **Indoor Mold**: Damp areas in the home, such as bathrooms, basements, or even the soil of indoor plants, can harbor mold. Mold spores become airborne easily and can be inhaled.
      * **Cockroach Droppings**: In urban environments, cockroach allergens can be a significant trigger, especially in older buildings.

      ### Symptoms: Is it a Cold or an Allergy?
      It's often hard to tell the difference because the symptoms overlap:
      1. **Allergies**: Symptoms usually last as long as you're exposed to the trigger. They include itchy, watery eyes, clear nasal discharge, and sneezing fits. Fever is NEVER a symptom of allergies.
      2. **Common Cold**: Usually lasts 7-10 days. Nasal discharge may become thick or yellowish. You might experience a low-grade fever and body aches.

      ### Comprehensive Strategies for Relief
      To manage winter allergies effectively, you must focus on environment control and medical management:
      1. **HEPA Filtration**: Use a high-efficiency particulate air (HEPA) filter in your bedroom and main living areas. Ensure your home heating system has a high-quality filter that is changed every 30-90 days.
      2. **Allergen-Proof Bedding**: Encase pillows, mattresses, and box springs in dust-mite-proof covers. This creates a physical barrier that prevents mites from colonizing your sleeping area.
      3. **Strategic Cleaning**: Vacuum at least twice a week using a vacuum with a HEPA filter. Damp-mop hard floors and dust with microfiber cloths that trap particles rather than spreading them.
      4. **Control Humidity**: Keep indoor humidity levels between 30% and 45%. Any higher promotes mold and dust mite growth; any lower can dry out your nasal passages, making them more sensitive.

      ### When to See a Specialist at Arogya
      If over-the-counter antihistamines and nasal sprays aren't providing enough relief, or if your "cold" seems to last all winter, it's time for a professional evaluation. Our pediatric and general medicine specialists at Arogya Hospital use advanced allergy testing to identify your specific triggers and can offer targeted therapies, including immunotherapy (allergy shots), to provide long-term relief.
    `
    },
    {
        id: 3,
        title: "Nutrition Tips for a Healthier Lifestyle",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2070",
        category: "Nutrition",
        date: "Nov 22, 2023",
        author: "Ms. Elena Rodriguez",
        readTime: "15 min read",
        content: `
      Nutrition is the fundamental pillar of health. Every cell in your body is built from and fueled by the food you consume. Modern life often pushes us toward convenience, but returning to the core principles of sound nutrition is the most powerful way to improve your energy, mood, and long-term health outcomes.

      ### The Foundation: Whole Foods vs. Processed Foods
      The most impactful change anyone can make is shifting toward whole, minimally processed foods. 
      * **Whole Foods**: Fruits, vegetables, nuts, seeds, legumes, whole grains, and lean proteins in their natural state. These are packed with fiber, vitamins, minerals, and antioxidants.
      * **Processed Foods**: Often contain high levels of added sugars, unhealthy fats (trans fats and saturated fats), and sodium, while being stripped of their natural nutrients.

      ### Core Principles of High-Performance Nutrition
      1. **Hydration is Non-Negotiable**: Water is essential for digestion, nutrient absorption, and temperature regulation. Aim for at least 2.5 to 3 liters a day, more if you are active. Avoid liquid calories like sodas and sugared lattes.
      2. **Fiber for Gut Health**: Most people consume less than half of the recommended daily fiber. Fiber helps regulate blood sugar, lowers cholesterol, and maintains a healthy digestive system. Focus on beans, lentils, broccoli, and apples.
      3. **Protein Timing**: Protein isn't just for athletes. It's necessary for tissue repair and immune function. Try to include a high-quality protein source (eggs, lean poultry, fish, tofu, or Greek yogurt) at every meal to maintain muscle mass and satiety.
      4. **Healthy Fats**: Your brain is 60% fat. Don't fear fats—focus on the right ones. Avocados, olive oil, walnuts, and fatty fish (like salmon) provide essential omega-3 fatty acids that reduce inflammation.

      ### Practical "Eat the Rainbow" Strategy
      Each color in plants represents different phytonutrients that protect your body:
      * **Red**: Lycopene and anthocyanins for heart health and skin protection.
      * **Orange/Yellow**: Beta-carotene for eye health and immune support.
      * **Green**: Chlorophyll and isothiocyanates for detoxification and bone strength.
      * **Blue/Purple**: Potent antioxidants that protect brain function.
      * **White/Tan**: Allicin and quercetin for anti-inflammatory benefits.

      ### Mindful Eating Habits
      * **The 80/20 Rule**: Focus on nutrient-dense foods 80% of the time, leaving 20% room for flexibility. This makes healthy eating sustainable.
      * **Listen to Hunger Cues**: Eat when you are physically hungry, not just because you are bored or stressed. Stop when you are 80% full.
      * **Cook at Home**: When you prepare your own food, you control every ingredient, especially the amount of salt and oil used.

      ### Personalized Nutrition at Arogya Hospital
      There is no "one-size-fits-all" diet. Every body has different metabolic needs based on age, activity level, and underlying health conditions. At Arogya Hospital, our expert clinical nutritionists provide one-on-one counseling and custom meal planning to help you reach your specific goals—whether that's weight management, controlling diabetes, or simply feeling more energized.
    `
    }
];

const Blogs = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    };

    return (
        <section className="py-20 md:py-28 gradient-hero relative overflow-hidden border-t border-white/10">
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-primary-foreground text-sm font-medium mb-4">
                        Health Insights
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-foreground mt-2">
                        Recent from <span className="text-white/70">Our Blog</span>
                    </h2>
                </div>

                <div className="max-w-6xl mx-auto relative">
                    {/* Main Card Wrapper */}
                    <div className="relative overflow-hidden rounded-[2rem] shadow-2xl border border-white/20 aspect-[16/10] md:aspect-[16/7]">
                        <div
                            className="flex transition-transform duration-700 ease-in-out h-full"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {posts.map((post, i) => (
                                <div key={i} className="min-w-full relative h-full group">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-6 md:p-10">
                                        <span className="text-primary-foreground/70 text-[10px] md:text-xs uppercase font-bold tracking-widest mb-2">
                                            {post.category}
                                        </span>
                                        <h3 className="text-white text-xl md:text-3xl font-serif font-bold leading-tight max-w-2xl">
                                            {post.title}
                                        </h3>
                                        <div className="mt-4 md:mt-6 flex items-center gap-4">
                                            <button
                                                onClick={() => setSelectedPost(post)}
                                                className="px-5 py-1.5 bg-white text-primary text-sm font-bold rounded-full hover:bg-white/90 transition-colors"
                                            >
                                                Read Article
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation arrows inside card */}
                        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between">
                            <button
                                onClick={prevSlide}
                                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all shadow-lg"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all shadow-lg"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Indicators below card */}
                    <div className="flex justify-center gap-2 mt-6">
                        {posts.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`transition-all duration-300 rounded-full h-2 ${i === currentIndex ? "bg-accent w-8" : "bg-white/30 w-2 hover:bg-white/50"
                                    }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Article Detail Dialog */}
            <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none bg-background">
                    {selectedPost && (
                        <div className="relative">
                            {/* Hero Image */}
                            <div className="h-[300 md:h-[400px] w-full relative">
                                <img
                                    src={selectedPost.image}
                                    alt={selectedPost.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest mb-4">
                                        {selectedPost.category}
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                                        {selectedPost.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setSelectedPost(null)}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Meta Info */}
                            <div className="px-8 py-6 bg-muted/30 border-b border-border flex flex-wrap gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-primary" />
                                    <span>{selectedPost.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span>{selectedPost.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span>{selectedPost.readTime}</span>
                                </div>
                            </div>

                            {/* Article Content */}
                            <div className="px-8 py-10">
                                <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed">
                                    {selectedPost.content.split('\n').map((paragraph, index) => {
                                        if (paragraph.trim().startsWith('###')) {
                                            return <h3 key={index} className="text-2xl mt-8 mb-4 text-foreground">{paragraph.replace('###', '').trim()}</h3>;
                                        }
                                        if (paragraph.trim().startsWith('*')) {
                                            return <li key={index} className="ml-4 mb-2 text-muted-foreground">{paragraph.replace('*', '').trim()}</li>;
                                        }
                                        if (paragraph.trim().match(/^\d\./)) {
                                            return <div key={index} className="ml-4 mb-4 text-muted-foreground"><strong>{paragraph.trim().split(' ')[0]}</strong> {paragraph.trim().split(' ').slice(1).join(' ')}</div>;
                                        }
                                        if (paragraph.trim() === '') return null;
                                        return <p key={index} className="mb-6">{paragraph.trim()}</p>;
                                    })}
                                </div>

                                <div className="mt-12 pt-8 border-t border-border flex justify-center">
                                    <button
                                        onClick={() => setSelectedPost(null)}
                                        className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:shadow-lg transition-all"
                                    >
                                        Close Article
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default Blogs;
