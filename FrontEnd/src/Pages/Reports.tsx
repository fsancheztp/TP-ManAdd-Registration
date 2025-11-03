import { ReportCard } from "@/components/ReportCard";

const reports = [
  {
    id: 0,
    title: "Adiciones Manuales",
    subtitle: "Informe de inicio / fin de registro",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis omnis, facilis quos sint alias eaque voluptas deleniti repudiandae possimus sunt.",
    href: "/reports/manadd",
  },
  {
    id: 1,
    title: "Lotes Registrados",
    subtitle: "Informes por lote",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis omnis, facilis quos sint alias eaque voluptas deleniti repudiandae possimus sunt.",
    href: "/reports/lots",
  },
  {
    id: 2,
    title: "Materiales Usados",
    subtitle: "Materiales y lotes",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis omnis, facilis quos sint alias eaque voluptas deleniti repudiandae possimus sunt.",
    href: "/reports/materials",
  },
];

const Reports = () => {
  return (
    <div className="lg:px-10 lg:py-10 mt-0 p-0 min-h-screen bg-slate-300">
      <div className="flex flex-col md:items-start items-center justify-between md:p-10 p-5">
        <h1 className="text-3xl font-extrabold text-orange-400 dark:text-orange-300">
          Informes
        </h1>
        <div className="mt-5 w-full items-center gap-5">
          <div className="flex md:flex-row flex-col justify-center items-center gap-2">
            {reports?.map((report) => (
              <ReportCard
                key={report.id}
                subtitle={report.subtitle}
                url={report.href}
                basicProps={{
                  title: `${report.title}`,
                  content: `${report.content}`,
                  className: "bg-slate-700 text-slate-300",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
