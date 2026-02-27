import { useEffect, useState } from "react";
import { useUserContext } from "../context";
import { ManAdd } from "@/types";
import { fetchData } from "@/actions/actions";
import { useNavigate } from "react-router-dom";
import { Header} from "@/components/Header";



import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Card, CardContent, CardHeader } from "@/components/ui/card";
import { CustomAlert } from "@/components/CustomAlert";

import { Button } from "@/components/ui/button";
import { GridIcon, Table2Icon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ManAddCard} from "@/components/ManAddCard.tsx";
import "@/css/03-layouts/page.css"; 
import "@/css/04-components/pagination.css"; 

const ManAddList = () => {
  const { user } = useUserContext();
  const [manadds, setManadds] = useState<ManAdd[] | null>(null);
  const [cardView, setCardView] = useState(true);
  const [page, setPage] = useState<number>(0);
  const [maxNumRecords] = useState<number>(5);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /* Functions */
  const handleRowClick = (id: number) => {
    console.log("id = ", id);
    if (!user || user.userName === "") {
      setShowModal(true);
      return;
    }
    navigate(`/manadd-page`, { state: { id: id } });
  };

  /* Use Effect Configuration */
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData();
        if (data !== null) setManadds(data);
        else setError("No hay conexión con base de datos");
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error al obtener los datos");
      }
    }
    getData();
  }, []);

  const total = manadds?.length ?? 0;
  const isPrevDisabled = page <= 0;
  const isNextDisabled = maxNumRecords * (page + 1) >= total;

  return (
    <main className="page">
      <Header title="Open Manual Additions" />
      <div className="page__container">
        <CustomAlert
          showModal={showModal}
          setShowModal={setShowModal}
          title="AVISO"
          content="Selecciona un usuario para continuar"
        />
        {/* <section className="corp-section">
          <header className="corp-section-header corp-section-header--primary">
            <h1 className="corp-section-title corp-section-title--on-primary"> 
              Manual Additions
            </h1>
            <div className="inline-flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <GridIcon 
                      onClick={() => setCardView(true)}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-700 text-white">
                    <p>Vista de tarjetas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Table2Icon
                      onClick={() => setCardView(false)}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-700 text-white">
                    <p>Vista de tabla</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </header>
        </section> */}

        <div className="flex flex-col lg:w-[80%] w-full mx-auto md:text-lg text-sm">
          {error ? (
            <div className="w-full bg-red-400 text-white text-lg md:text-xl p-5 rounded-xl text-center font-bold">
              <h1 className="text-gray-800 uppercase">{error}</h1>
              <span className="text-sm font-light">
                Revisa la conexión de red o contacta con el Administrador del sistema
              </span>
            </div>
          ) : (
            <>
              {!cardView && (
                /*--------------------------------- ManAdds View as a Table  ----------------------------------*/
                <Card className="bg-slate-800 text-white w-full">
                  <CardHeader>
                    <p>Seleccione un ManAdd para registrar adiciones</p>
                  </CardHeader>
                  <CardContent>
                    <Table className="corp-table"> 
                      <TableCaption> </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Equip</TableHead>
                          <TableHead>Material</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead className="text-center">Target</TableHead>
                          <TableHead className="text-center">Actual</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {manadds
                          ?.slice(maxNumRecords * page, maxNumRecords * (1 + page))
                          .map((item) => (
                            <TableRow
                              key={item.id}
                              className="cursor-pointer hover:bg-blue-300 dark:hover:bg-blue-700 lg:text-xl"
                              onClick={() => handleRowClick(item.id)}
                            >
                              <TableCell className="font-medium">
                                {item.equipmentName}
                              </TableCell>
                              <TableCell>{item.materialName}</TableCell>
                              <TableCell className="flex flex-col justify-center items-center">
                                <p>
                                  {new Date(item.startDateTime).toLocaleDateString()}
                                </p>
                                <span className="text-sm">
                                  {new Date(item.startDateTime).toLocaleTimeString()}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                {item.targetAmount}
                              </TableCell>
                              <TableCell className="text-right">
                                {item.actualAmount}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>

                    {/* --- Corporate icon-only pagination --- */}
                    <div className="corp-pagination">
                      <div className="corp-pagination-row">
                        <Button
                          variant="icon"
                          aria-label="Previous page"
                          title="Previous"
                          disabled={isPrevDisabled}
                          onClick={() => {
                            if (isPrevDisabled) return;
                            setPage((prev) => Math.max(0, prev - 1));
                          }}
                        >
                          <ChevronLeft size={18} />
                        </Button>

                        <Button
                          variant="icon"
                          aria-label="Next page"
                          title="Next"
                          disabled={isNextDisabled}
                          onClick={() => {
                            if (isNextDisabled) return;
                            setPage((prev) => prev + 1);
                          }}
                        >
                          <ChevronRight size={18} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/*--------------------- ManAdds view as Card serie ------------------------------   */}
              {cardView && (
                <div className="flex flex-1 flex-col gap-2 md:p-4 p-0">
                  <div className="grid auto-rows-min gap-2 md:grid-cols-3">
                    {manadds?.map((manAdd) => (
                      <div
                        key={manAdd.id}
                        className="rounded-xl corp-card-wrapper"
                      >
                        <ManAddCard
                          manAddInfo={manAdd}
                          showBasket={true}
                          onBasketClick={() => handleRowClick(manAdd.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default ManAddList;
