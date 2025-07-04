import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text,
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Float,
  Environment,
  ContactShadows,
  Box,
  RoundedBox,
} from "@react-three/drei";
import { RawImg } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  ArrowRight,
  Download,
  Phone,
  Menu,
  Shield,
  Lock,
  Terminal,
  Zap,
  Eye,
  AlertTriangle,
  Server,
  Globe,
  Bug,
} from "lucide-react";
import * as THREE from "three";

// Matrix Rain Component
function MatrixRain() {
  const points = useRef<THREE.Points>(null);
  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount);

  // Initialize positions and velocities
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = Math.random() * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    velocities[i] = Math.random() * 0.02 + 0.01;
  }

  useFrame(() => {
    if (points.current) {
      const positionsArray = points.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        positionsArray[i * 3 + 1] -= velocities[i];

        if (positionsArray[i * 3 + 1] < -10) {
          positionsArray[i * 3 + 1] = 10;
          positionsArray[i * 3] = (Math.random() - 0.5) * 20;
          positionsArray[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
      }

      points.current.geometry.attributes.position.needsUpdate = true;
      points.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ff41"
        transparent
        opacity={0.8}
        sizeAttenuation={false}
      />
    </points>
  );
}

// Malware and Ransomware Threat Symbols
function ThreatGeometry({
  position,
  threatType,
}: {
  position: [number, number, number];
  threatType: "skull" | "virus" | "ransomware" | "trojan";
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y =
        Math.cos(state.clock.elapsedTime * 0.3) * 0.3;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  const SkullSymbol = () => (
    <group>
      {/* Skull Main */}
      <Sphere args={[0.3, 16, 16]} position={[0, 0.1, 0]}>
        <meshStandardMaterial
          color="#ff0040"
          emissive="#330008"
          transparent
          opacity={0.9}
        />
      </Sphere>
      {/* Eye Sockets */}
      <Sphere args={[0.08, 8, 8]} position={[-0.1, 0.15, 0.2]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      <Sphere args={[0.08, 8, 8]} position={[0.1, 0.15, 0.2]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      {/* Crossbones */}
      <Box
        args={[0.4, 0.05, 0.05]}
        position={[0, -0.2, 0]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <meshStandardMaterial color="#ffffff" />
      </Box>
      <Box
        args={[0.4, 0.05, 0.05]}
        position={[0, -0.2, 0]}
        rotation={[0, 0, -Math.PI / 4]}
      >
        <meshStandardMaterial color="#ffffff" />
      </Box>
    </group>
  );

  const VirusSymbol = () => (
    <group>
      {/* Virus Core */}
      <Sphere args={[0.2, 12, 12]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00ff41"
          emissive="#004d0d"
          transparent
          opacity={0.8}
        />
      </Sphere>
      {/* Virus Spikes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.3;
        const z = Math.sin(angle) * 0.3;
        return (
          <Box
            key={i}
            args={[0.03, 0.2, 0.03]}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
          >
            <meshStandardMaterial color="#ff0040" />
          </Box>
        );
      })}
    </group>
  );

  const RansomwareSymbol = () => (
    <group>
      {/* Lock Base */}
      <Box args={[0.3, 0.2, 0.1]} position={[0, -0.1, 0]}>
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#331a00"
          transparent
          opacity={0.9}
        />
      </Box>
      {/* Lock Shackle */}
      <group position={[0, 0.1, 0]}>
        <Box args={[0.15, 0.03, 0.03]} position={[-0.075, 0, 0]}>
          <meshStandardMaterial color="#ffaa00" />
        </Box>
        <Box args={[0.15, 0.03, 0.03]} position={[0.075, 0, 0]}>
          <meshStandardMaterial color="#ffaa00" />
        </Box>
        <Box args={[0.03, 0.15, 0.03]} position={[-0.15, -0.075, 0]}>
          <meshStandardMaterial color="#ffaa00" />
        </Box>
        <Box args={[0.03, 0.15, 0.03]} position={[0.15, -0.075, 0]}>
          <meshStandardMaterial color="#ffaa00" />
        </Box>
      </group>
      {/* Warning Symbol */}
      <Box
        args={[0.15, 0.02, 0.02]}
        position={[0, -0.05, 0.06]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <meshStandardMaterial color="#ff0040" />
      </Box>
      <Box
        args={[0.15, 0.02, 0.02]}
        position={[0, -0.05, 0.06]}
        rotation={[0, 0, -Math.PI / 4]}
      >
        <meshStandardMaterial color="#ff0040" />
      </Box>
    </group>
  );

  const TrojanSymbol = () => (
    <group>
      {/* Trojan Horse Body */}
      <Box args={[0.4, 0.2, 0.15]} position={[0, -0.05, 0]}>
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#2d1b69"
          transparent
          opacity={0.8}
        />
      </Box>
      {/* Horse Head */}
      <Box args={[0.15, 0.25, 0.1]} position={[0.25, 0.1, 0]}>
        <meshStandardMaterial color="#8b5cf6" />
      </Box>
      {/* Hidden Malware Core (glowing red) */}
      <Sphere args={[0.08, 8, 8]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ff0040"
          emissive="#ff0040"
          emissiveIntensity={0.5}
        />
      </Sphere>
      {/* Legs */}
      {[-0.15, -0.05, 0.05, 0.15].map((x, i) => (
        <Box key={i} args={[0.03, 0.15, 0.03]} position={[x, -0.2, 0]}>
          <meshStandardMaterial color="#8b5cf6" />
        </Box>
      ))}
    </group>
  );

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <group ref={meshRef} position={position} scale={[1.2, 1.2, 1.2]}>
        {threatType === "skull" && <SkullSymbol />}
        {threatType === "virus" && <VirusSymbol />}
        {threatType === "ransomware" && <RansomwareSymbol />}
        {threatType === "trojan" && <TrojanSymbol />}
      </group>
    </Float>
  );
}

function CyberScene() {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.2} color="#00ff41" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0040" />

      <MatrixRain />

      <ThreatGeometry position={[-4, 2, -3]} threatType="skull" />
      <ThreatGeometry position={[4, -1, -2]} threatType="ransomware" />
      <ThreatGeometry position={[-3, -2, 2]} threatType="virus" />
      <ThreatGeometry position={[3, 1, 3]} threatType="trojan" />

      <ContactShadows
        opacity={0.4}
        scale={10}
        blur={1}
        far={10}
        resolution={256}
        color="#000000"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2.5}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </>
  );
}

// Terminal Text Effect
function TerminalText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [text, currentIndex]);

  return (
    <span className={`font-mono ${className}`}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-[#00ff41] font-mono text-2xl">
        <span className="animate-pulse">
          INITIALIZING SECURITY PROTOCOLS...
        </span>
      </div>
    </div>
  );
}

export default function Index() {
  const [currentSection, setCurrentSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 2000);
  }, []);

  const skills = {
    "Application Security & DevSecOps": [
      "DAST",
      "SAST",
      "Application Security",
      "Penetration Testing",
      "Burp Suite",
      "OWASP ZAP",
    ],
    "Cloud Security": [
      "GCP",
      "AWS",
      "Azure",
      "Kubernetes Security",
      "Sentinel",
      "OPA Gatekeeper",
      "GRC",
    ],
    "Programming & Development": [
      "Python",
      "Golang",
      "JavaScript",
      "Java",
      "Node.js",
      "Machine Learning",
    ],
    "AI / ML": [
      "Regression",
      "Scikit-learn",
      "Feature Engineering",
      "Agentic AI",
      "RAG",
      "MCP",
    ],
    "Security Tools & Infrastructure": [
      "Jenkins",
      "GitHub Actions",
      "Terraform",
      "Grafana",
      "AI Security",
      "ASPM",
    ],
  };

  const projects = [
    {
      title:
        "Simplified Application Security Posture Management using Agentic AI",
      description:
        "Utilising Agentic AI frameworks , provided a holistic overview of Security Posture of multiple Applications , addressing the risk assessments of key areas in Software Supply Chain Lifecycle by generating a Pipeline Bill of Materials.",
      tech: ["Python3", "crewAI", "AgenticAI", "Node.js", "Golang", "PGvector"],
      featured: true,
    },
    {
      title: "RAG based chat bot for automating SOPs powered by Langflow",
      description:
        "Led development of Streamlit-based chatbot designed to assist OT (Operational Technology) service and support teams by answering questions based on a library of Standard Operating Procedure (SOP) documents. The system uses a RAG(Retrieval- Augmented Generation) pipeline built with Langflow to provide accurate, context - aware answers along with pictures from your private documentation.",
      tech: ["Python3", "Langflow", "AgenticAI", "Gemini", "MongoDB"],
      featured: true,
      link: "https://www.youtube.com/watch?v=cOzdZIjtiKY"
    },
    {
      title: "LangFlow MCP High ATS Resume Creator (ATS-Aware)",
      description:
        "The core functionality is that it generates a high ATS (Applicant Tracking System) score resume based on a LinkedIn job post URL and a user's existing resume. The system parses both sources, summarizes relevant content, and produces a tailored, ATS-friendly resume in multiple formats",
      tech: ["Python3", "Langflow", "AgenticAI", "Gemini"],
      featured: true,
      link: "https://www.youtube.com/watch?v=QfaxV7b7jQY"
    },
    {
      title: "Correlation Power Attack",
      description:
        "Applied CPA attack on a FPGA after collecting the power traces",
      tech: ["Python3", "ML", "Jupyter", "AES"],
      featured: true,
      link: "https://github.com/Vinayaks439/CPA-SCA-python",
    },
  ];

  const experience = [
    {
      position: "CyberSecurity Engineer 3",
      period: "Present",
      location: "Remote / Global",
      clearance: "Enterprise",
      description:
        "Part of the Cloud Security Engineering Division, focusing on protecting enterprise assets across public, hybrid, and private cloud environments through comprehensive risk assessment and governance frameworks.",
      achievements: [
        "Contributed to software supply chain security by performing provenance attestation of artifacts generated in each SDLC stage",
        "Developed and maintained cloud security policies and procedures for enterprise-scale deployments",
        "Conducted threat modeling and vulnerability assessments for cloud-native applications and infrastructure",
        "Collaborated with development teams to integrate security controls into CI/CD pipelines and executed hard gating mechanisms on shift-right security controls to ensure compliance and security standards",
      ],
    },
    {
      position: "Senior DevSecOps Engineer",
      location: "Bangalore, India",
      clearance: "Enterprise",
      description:
        "Leading DevSecOps initiatives , specializing in application security, Kubernetes security, and security automation for enterprise software solutions.",
      achievements: [
        "Resulted in customer engagement by 50 % through the development of a scalable and secure Kubernetes operator",
        "Increased Security Posture by 30 % by providing guidance to customers by supporting them in establishing a Secure SDOL",
        "Increased developer satisfaction scores by 25 % through the implementation of GenAI solutions in SSDLC",
        "Reduced the infrastructure issues by 80 % by managing the infrastructure team to ensure smooth daily operations",
        "Designed and Developed Dynamic Application Security Testing solutions which catered for multiple customers, increase application security portfolio by 25%",
        "Organized the biggest Capture the Flag event at SAP and fostered training sessions to improve knowledge of App Sec to developers",
      ],
    },
    {
      position: "DevSecOps Engineer",
      location: "Bangalore, India",
      clearance: "Enterprise",
      description:
        "DevSecOps initiatives , specializing in application security, Kubernetes security, and security automation for enterprise software solutions.",
      achievements: [
        "Increased Application Security Posture by 40 % through rigorous penetration testing",
        "Secured major contributions to the open - source SAP Jenkins Library enhancing community trust",
        "Enhanced developer security awareness through targeted Security training sessions",
        "Developed tools to proactively identify open- source vulnerabilities using Node, Golang - Gin, Vue.js, and Python",
        "Implemented distributed tracing with Open Telemetry along with Splunk and Signalfx",
      ],
    },
    {
      position: "DevOps Engineer",
      location: "Bangalore, India",
      clearance: "Standard",
      description:
        "Worked as DevOps Engineer at a data analytics company, focusing on infrastructure automation, ETL pipeline optimization, and cloud deployments.",
      achievements: [
        "Achieved 40% cost reduction by automating ETL pipeline infrastructure processes",
        "Set up PLG and LWG stacks on Kubernetes for improved monitoring and logging",
        "Automated repetitive tasks using Ansible playbooks reducing manual effort",
        "Provisioned scalable infrastructure using Terraform for consistent deployments",
        "Worked extensively with Jenkins, Kubernetes, GCP, Hadoop, and Spark technologies",
      ],
    },
  ];

  const certifications = [
    "DevSecOps Expert",
    "Cybersecurity Expert",
    "Application Security",
    "Cloud Security",
    "Kubernetes Security",
    "GCP Certified",
    "Security Leadership",
    "HashiCorp Terraform Associate",
  ];

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div
      className="min-h-screen text-[#00ff41] relative overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #000000 50%, #0a0a0a 75%, #000000 100%)",
        fontFamily: "'Courier New', monospace",
      }}
    >
      {/* Matrix Background Pattern */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              #00ff41 2px,
              #00ff41 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              #00ff41 2px,
              #00ff41 4px
            )
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen flex flex-col overflow-hidden"
      >
        {/* Navigation */}
        <nav className="fixed top-0 z-50 w-full py-5 px-8 bg-black/50 backdrop-blur-sm border-b border-[#00ff41]/20">
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#00ff41] rounded border-2 border-[#00ff41] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-black" />
              </div>
              <div className="font-mono text-lg font-bold">
                <span className="text-[#00ff41]">root@</span>
                <span className="text-white">vinayak:</span>
                <span className="text-[#00ff41]">~$</span>
              </div>
            </div>

            <ul className="hidden md:flex gap-8 font-mono">
              <li className="text-[#00ff41]/70 hover:text-[#00ff41] text-sm font-medium cursor-pointer transition-colors">
                <a href="#about">./about</a>
              </li>
              <li className="text-[#00ff41]/70 hover:text-[#00ff41] text-sm font-medium cursor-pointer transition-colors">
                <a href="#skills">./skills</a>
              </li>
              <li className="text-[#00ff41]/70 hover:text-[#00ff41] text-sm font-medium cursor-pointer transition-colors">
                <a href="#projects">./projects</a>
              </li>
              <li className="text-[#00ff41]/70 hover:text-[#00ff41] text-sm font-medium cursor-pointer transition-colors">
                <a href="#contact">./contact</a>
              </li>
            </ul>

            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black font-mono"
              asChild
            >
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                download="Vinayak_S_Resume.pdf"
              >
                <Download className="w-4 h-4 mr-2" />
                download_resume.pdf
              </a>
            </Button>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#00ff41]"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`${!mobileMenuOpen ? "hidden" : "flex"} md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm border-b border-[#00ff41]/20 p-4`}
          >
            <ul className="flex flex-col gap-4 w-full font-mono">
              <li>
                <a
                  href="#about"
                  className="block text-[#00ff41]/70 hover:text-[#00ff41]"
                >
                  ./about
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="block text-[#00ff41]/70 hover:text-[#00ff41]"
                >
                  ./skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="block text-[#00ff41]/70 hover:text-[#00ff41]"
                >
                  ./projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block text-[#00ff41]/70 hover:text-[#00ff41]"
                >
                  ./contact
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative w-full h-screen">
          <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto px-8 flex items-start gap-5">
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="w-5 h-5 rounded-full bg-[#00ff41] animate-pulse" />
              <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#00ff41] via-[#00ff41]/50 to-transparent" />
            </div>

            <div className="flex-1">
              <div className="font-mono text-sm text-[#00ff41]/70 mb-4">
                $ whoami
              </div>
              <h1 className="font-mono font-black text-white lg:text-[60px] sm:text-[50px] text-[40px] lg:leading-[70px] mt-2">
                <TerminalText text="VINAYAK S" />
              </h1>
              <div className="font-mono text-sm text-[#00ff41]/70 mb-2">
                $ cat /etc/passwd | grep vinayak
              </div>
              <p className="text-[#00ff41] font-mono lg:text-[24px] sm:text-[20px] text-[16px] lg:leading-[32px] mt-2">
                <TerminalText text="Cybersecurity Engineer | Cloud & Appliation Security Divison | DevSecOps Specialist" />
              </p>
              <div className="font-mono text-sm text-[#00ff41]/70 mt-4">
                $ ps aux | grep -i security
              </div>
              <p className="text-white/80 font-mono text-sm mt-2 max-w-2xl">
                5+ years defending digital assets through advanced threat
                detection,
                <br />
                secure application development, and cloud security architecture.
              </p>

              <div className="flex gap-4 mt-8">
                <Button className="bg-[#00ff41] text-black hover:bg-[#00ff41]/80 font-mono">
                  <Terminal className="w-4 h-4 mr-2" />
                  ./view_projects.sh
                </Button>
                <Button
                  variant="outline"
                  className="border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black font-mono"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  ./contact.sh
                </Button>
              </div>

              {/* Security Clearance & Certs */}
              <div className="mt-8 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-[#ff0040]" />
                  <span className="text-[#ff0040] font-mono">
                    CLEARANCE: TOP SECRET
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {certifications.slice(0, 4).map((cert) => (
                    <Badge
                      key={cert}
                      variant="outline"
                      className="border-[#00ff41] text-[#00ff41] font-mono text-xs"
                    >
                      {cert}
                    </Badge>
                  ))}
                  <Badge
                    variant="outline"
                    className="border-[#00ff41]/50 text-[#00ff41]/50 font-mono text-xs"
                  >
                    +{certifications.length - 4} more
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="absolute inset-0 w-full h-full opacity-40">
            <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
              <Suspense fallback={null}>
                <CyberScene />
              </Suspense>
            </Canvas>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 w-full flex justify-center items-center">
            <a href="#about" className="cursor-pointer animate-bounce">
              <div className="w-[35px] h-[64px] rounded-3xl border-2 border-[#00ff41] flex justify-center items-start p-2">
                <div className="w-3 h-3 rounded-full bg-[#00ff41] mb-1" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black/50">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="font-mono text-sm text-[#00ff41]/70 mb-4">
                $ cat ./about.txt
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-mono">
                THREAT ANALYSIS COMPLETE
              </h2>
              <p className="text-xl text-[#00ff41]/80 font-mono">
                Fortifying digital perimeters one vulnerability at a time
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg leading-relaxed mb-6 text-white/90 font-mono">
                  Senior DevSecOps professional with over 5 years of experience
                  in information Security Engineering and security automation,
                  expert in application security and Kubernetes. Currently
                  leading security initiatives.
                </p>
                <p className="text-lg leading-relaxed mb-8 text-white/90 font-mono">
                  My mission: Enable secure, efficient, scalable, and reliable
                  application platforms through end-to-end secure software
                  supply chain lifecycle implementation. Expert in application
                  security, cloud security, and network security.
                </p>
                <div className="space-y-3 font-mono">
                  <div className="flex items-center text-[#00ff41]">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    B.E. Mechanical Engineering, BMSCE (2016-2020)
                  </div>
                  <div className="flex items-center text-[#00ff41]">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Master in CyberSecurity, IIT Kanpur (2024-2026)
                  </div>
                  <div className="flex items-center text-[#00ff41]">
                    <MapPin className="w-5 h-5 mr-2" />
                    Bangalore, India
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <Card className="bg-black border-[#00ff41] hover:shadow-lg hover:shadow-[#00ff41]/20 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Bug className="w-8 h-8 text-[#ff0040] mr-3" />
                      <div>
                        <h3 className="font-semibold text-white font-mono">
                          4+ Years
                        </h3>
                        <p className="text-sm text-[#00ff41]/80 font-mono">
                          DevSecOps Experience
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-black border-[#00ff41] hover:shadow-lg hover:shadow-[#00ff41]/20 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Shield className="w-8 h-8 text-[#00ff41] mr-3" />
                      <div>
                        <h3 className="font-semibold text-white font-mono">
                          3 Awards
                        </h3>
                        <p className="text-sm text-[#00ff41]/80 font-mono">
                          Received in 2024
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="font-mono text-sm text-[#00ff41]/70 mb-4">
                $ ls -la ./skills/
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-mono">
                SECURITY ARSENAL
              </h2>
              <p className="text-xl text-[#00ff41]/80 font-mono">
                Tools and techniques for digital warfare
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <Card
                  key={category}
                  className="h-full bg-black border-[#00ff41] hover:shadow-lg hover:shadow-[#00ff41]/20 transition-all"
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-[#00ff41] font-mono flex items-center gap-2">
                      {category === "Application Security" && (
                        <Lock className="w-5 h-5" />
                      )}
                      {category === "Cloud Security" && (
                        <Globe className="w-5 h-5" />
                      )}
                      {category === "DevSecOps" && (
                        <Server className="w-5 h-5" />
                      )}
                      {category === "Tools & Frameworks" && (
                        <Terminal className="w-5 h-5" />
                      )}
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="bg-black border-[#00ff41]/50 text-[#00ff41] font-mono text-xs hover:bg-[#00ff41]/10"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black/50">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="font-mono text-sm text-[#00ff41]/70 mb-4">
                $ cat ./projects/README.md
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-mono">
                SECURITY OPERATIONS
              </h2>
              <p className="text-xl text-[#00ff41]/80 font-mono">
                Mission-critical security implementations
              </p>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="h-full bg-black border-[#00ff41] hover:shadow-lg hover:shadow-[#00ff41]/20 transition-all group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg text-white font-mono group-hover:text-[#00ff41] transition-colors">
                        {project.title}
                      </CardTitle>
                      <div className="flex gap-2">
                        {project.featured && (
                          <Badge className="text-xs bg-[#ff0040] text-white font-mono">
                            CLASSIFIED
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className={`text-xs font-mono ${
                            project.threat_level === "Critical"
                              ? "border-[#ff0040] text-[#ff0040]"
                              : "border-[#ffaa00] text-[#ffaa00]"
                          }`}
                        >
                          {project.threat_level}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed text-white/80 font-mono">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs border-[#00ff41]/30 text-[#00ff41]/80 font-mono"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-mono text-xs border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black"
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="font-mono text-sm text-[#00ff41]/70 mb-4">
                $ history | grep -i experience
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-mono">
                SECURITY TIMELINE
              </h2>
              <p className="text-xl text-[#00ff41]/80 font-mono">
                Career progression in cyber warfare
              </p>
            </div>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <Card
                  key={index}
                  className="bg-black border-[#00ff41] hover:shadow-lg hover:shadow-[#00ff41]/20 transition-all"
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white font-mono">
                          {job.position}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge className="bg-[#ff0040] text-white font-mono text-xs">
                            {job.clearance}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-[#00ff41]/80 font-mono">
                          <MapPin className="w-4 h-4 mr-2" />
                          {job.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-white/80 mb-4 leading-relaxed font-mono text-sm">
                      {job.description}
                    </p>
                    <div className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start">
                          <div className="w-2 h-2 bg-[#00ff41] rounded-full mt-2 mr-3 flex-shrink-0" />
                          <p className="text-sm text-white/90 font-mono">
                            {achievement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/50">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="font-mono text-sm text-[#00ff41]/70 mb-4">
              $ ./initiate_contact.sh
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-mono">
              ESTABLISH SECURE CONNECTION
            </h2>
            <p className="text-xl text-[#00ff41]/80 mb-8 font-mono">
              Ready for your next security challenge?
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <Card className="bg-black border-[#00ff41] hover:shadow-lg hover:shadow-[#00ff41]/20 transition-all w-auto">
                <CardContent className="p-6 text-center">
                  <Linkedin className="w-8 h-8 text-[#00ff41] mx-auto mb-4" />
                  <h3 className="font-semibold mb-2 text-white font-mono">
                    PROFESSIONAL NET
                  </h3>
                  <p className="text-[#00ff41]/80 font-mono text-sm flex justify-center">
                    <a
                      href="https://www.linkedin.com/in/vinayaks439/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#00ff41] transition-colors"
                    >
                      linkedin.com/in/vinayaks439
                    </a>
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-black border-[#00ff41] hover:shadow-lg hover:shadow-[#00ff41]/20 transition-all w-auto">
                <CardContent className="p-6 text-center">
                  <Github className="w-8 h-8 text-[#00ff41] mx-auto mb-4" />
                  <h3 className="font-semibold mb-2 text-white font-mono">
                    CODE REPOSITORY
                  </h3>
                  <p className="text-[#00ff41]/80 font-mono text-sm flex justify-center">
                    <a
                      href="https://github.com/Vinayaks439"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#00ff41] transition-colors"
                    >
                      github.com/Vinayaks439
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>

            <Button
              size="lg"
              className="text-lg h-12 px-8 bg-[#00ff41] text-black hover:bg-[#00ff41]/80 font-mono"
            >
              <Terminal className="w-5 h-5 mr-2" />
              ./send_encrypted_message.sh
            </Button>

            <div className="mt-8 p-4 border border-[#00ff41]/30 rounded bg-black/50">
              <p className="text-xs text-[#00ff41]/60 font-mono">
                WARNING: All communications are monitored for security purposes.
                <br />
                Use PGP encryption for sensitive information. Key ID: 0x1337BEEF
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#00ff41]/20 py-12 bg-black">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-[#00ff41]/80 font-mono text-sm">
                © 2024 Vinayak S. | Built with React +
                Three.js
              </p>
              <p className="text-[#00ff41]/40 font-mono text-xs mt-1">
                "In God we trust, all others we monitor" - NSA
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/in/vinayaks439/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00ff41]/80 hover:text-[#00ff41] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#00ff41]/80 hover:text-[#00ff41] transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
