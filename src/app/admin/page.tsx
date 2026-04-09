// src/app/(admin)/dashboard/page.tsx

import { AdminCard } from "@/components/admin/admin-card";
import AdminHeader from "@/components/admin/header";
const CARDS = [
  {
    title: "Obras de arte",
    description:
      "Gestioná las obras del museo: agregá nuevas, editá descripciones, asigná narraciones y vinculá beepcons.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Leonardo_da_Vinci_-_Mona_Lisa_%28Louvre%2C_Paris%29.jpg/250px-Leonardo_da_Vinci_-_Mona_Lisa_%28Louvre%2C_Paris%29.jpg",
    href: "/admin/artworks",
  },
  {
    title: "Visitas guiadas",
    description:
      "Creá y editá tours, definí el orden de las paradas, gestioná turnos y confirmá reservas de visitantes.",
    imageUrl:
      "https://scontent.fres2-2.fna.fbcdn.net/v/t1.6435-9/35887066_1709326552449364_8594324585447424000_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=_Fh7nPW7a20Q7kNvwG7C7HR&_nc_oc=AdqVWI0S4Lt9SeN8k4oYLQo7bivoocML-HirRNAkxuJz95V2imtyiqGULNo1nSfdCNQ&_nc_zt=23&_nc_ht=scontent.fres2-2.fna&_nc_gid=OoC1T1t1eFY9vDxwiPLt6A&_nc_ss=7a389&oh=00_Af2ctuEK8IrQtx9aAdKuhQf-s0BBQjdzqea27KCA28CtJg&oe=69F64A3A",
    href: "/admin/tours",
  },
  {
    title: "Usuarios",
    description:
      "Consultá los visitantes registrados, revisá sus preferencias de accesibilidad y el historial de alertas.",
    imageUrl:
      "https://i.pinimg.com/736x/a1/eb/64/a1eb643ca6322377f04ddcae1d590b8e.jpg",
    href: "/admin/users",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-cream px-14 py-12">

      {/* Header */}
     <AdminHeader></AdminHeader>

      {/* Grid de 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {CARDS.map((card) => (
          <AdminCard key={card.href} {...card} />
        ))}
      </div>

    </div>
  );
}