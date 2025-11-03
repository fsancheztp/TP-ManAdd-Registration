import { useEffect, useState } from "react";
import { useUserContext } from "../context";
import { ManAdd } from "@/types";
import { fetchData } from "@/actions/actions";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomAlert } from "@/components/CustomAlert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GridIcon, ShoppingBasket, Table2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

const Home = () => {
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
    if (!user || user.userName === "") {
      setShowModal(true);
      return;
    }
    navigate(`/manadd-page`, { state: { id: id } });
  };

  /* Use Effect Configuration */
  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    console.log(process.env.NODE_ENV);
    async function getData() {
      const data = await fetchData();
      if (data !== null) setManadds(data);
      else setError("No hay conexión con base de datos");
    }
    getData();
  }, []);

  return (
    <div className="lg:px-10 lg:py-10 mt-0 p-0 min-h-screen bg-secondary">
      <CustomAlert
        showModal={showModal}
        setShowModal={setShowModal}
        title="AVISO"
        content="Selecciona un usuario para continuar"
      />
      <div className="flex items-center justify-between md:p-10 p-5">
        <h1 className="md:text-3xl text-lg font-extrabold text-text-third dark:text-text-third/80">
          Salsa Rica | Manual Addition
        </h1>
        <div className="flex flex-row gap-2 items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <GridIcon
                  onClick={() => setCardView(true)}
                  className="cursor-pointer text-slate-700"
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
                  className="cursor-pointer text-slate-700"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-slate-700 text-white">
                <p>Vista de tabla</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex flex-col lg:w-[80%] w-full mx-auto md:text-lg text-sm">
        {error ? (
          <div className="w-full bg-red-400 text-white text-lg md:text-xl p-5 rounded-xl text-center font-bold">
            <h1 className="text-inherit uppercase">{error}</h1>
            <span className="text-sm font-light">
              Revisa la conexión de red o contacta con el Administrador del
              sistema
            </span>
          </div>
        ) : (
          <>
            {!cardView && (
              <Card className="bg-slate-800 text-white">
                <CardHeader>
                  Selecciona un ManAdd abierto para registrar adiciones
                </CardHeader>
                <CardContent>
                  <Table className="text-inherit">
                    <TableCaption>A list of open ManAdds</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Equipment</TableHead>
                        <TableHead>Material</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead className="text-right">Target</TableHead>
                        <TableHead className="text-right">Actual</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {manadds
                        ?.slice(
                          maxNumRecords * page,
                          maxNumRecords * (1 + page)
                        )
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
                                {new Date(
                                  item.startDateTime
                                ).toLocaleDateString()}
                              </p>
                              <span className="text-sm">
                                {new Date(
                                  item.startDateTime
                                ).toLocaleTimeString()}
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
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={() => {
                            if (page <= 0) return;
                            setPage((prev) => prev - 1);
                          }}
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={() => {
                            if (
                              maxNumRecords * (1 + page) >=
                              (manadds?.length ? manadds.length : 1000)
                            )
                              return;
                            setPage((prev) => prev + 1);
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardContent>
              </Card>
            )}

            {/* Cards - view */}
            {cardView && (
              <div className="flex flex-1 flex-col gap-4 md:p-4 p-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  {manadds?.map((manAdd) => (
                    <div
                      key={manAdd.id}
                      className="sm:aspect-video rounded-xl"
                      onClick={() => handleRowClick(manAdd.id)}
                    >
                      <CardManAdd manAddInfo={manAdd} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

function CardManAdd({ manAddInfo }: { manAddInfo: ManAdd }) {
  return (
    <Card className="w-auto cursor-pointer">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
          <p className="md:text-lg text-sm">{manAddInfo.materialName}</p>
          <Badge
            className={`${
              manAddInfo.actualAmount > 0
                ? "bg-yellow text-text-primary"
                : "bg-green text-white"
            } text-sm font-bold`}
          >
            {manAddInfo.equipmentName}
          </Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          {manAddInfo.materialID} {" | "}
          {new Date(manAddInfo.startDateTime).toLocaleDateString()}{" "}
          {new Date(manAddInfo.startDateTime).toLocaleTimeString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Fase</Label>
            <Input
              id="phase"
              placeholder="Fase"
              value={manAddInfo.phaseName}
              readOnly
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Cantidad Objetivo</Label>
            <Input
              id="targetQty"
              placeholder="Cantidad"
              value={manAddInfo.targetAmount}
              readOnly
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Progreso</Label>
            <div className="flex flex-row w-full items-center justify-between gap-2">
              <Progress
                value={Math.floor(
                  (100 * manAddInfo.actualAmount) / manAddInfo.targetAmount
                )}
                className="flex-1"
              />
              <p className="text-slate-400 text-sm">
                {Math.floor(
                  (100 * manAddInfo.actualAmount) / manAddInfo.targetAmount
                )}
                {" %"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-between">
        <Button
          variant={"secondary"}
          className="w-full bg-primary text-white"
        >
          <ShoppingBasket /> Registrar Lotes
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Home;
