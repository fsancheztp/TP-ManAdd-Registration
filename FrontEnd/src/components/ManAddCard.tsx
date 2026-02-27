import { useEffect, useState } from "react";
import { useUserContext } from "../context";
import { ManAdd } from "@/types";
import { fetchData } from "@/actions/actions";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShoppingBasket } from "lucide-react";

interface ManAddCardProps {
  manAddInfo: ManAdd;
  showBasket?: boolean;
  onBasketClick?: (id: number) => void;
}


export function ManAddCard({manAddInfo, showBasket = true, onBasketClick}:ManAddCardProps) {
  const progress = Math.floor(
    (100 * manAddInfo.actualAmount) / manAddInfo.targetAmount
  );

  return (
    <Card className="corp-card">
      <CardHeader className="corp-card-header">
        <CardTitle className="corp-card-title" style={{fontWeight:"600"}}>{manAddInfo.materialName}
          {/* <p className="md:text-lg text-sm">{manAddInfo.materialName}</p> */}

          <Badge className="copr-badge">
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
            <Label>Fase</Label>
            <Input
              id="phase"
              value={manAddInfo.phaseName}
              readOnly
            />
          </div>

          {/* <div className="flex flex-col space-y-1.5">
            <Label>Cantidad Objetivo</Label>
            <Input
              id="targetQty"
              value={manAddInfo.targetAmount}
              readOnly
            />
          </div> */}

          <div>
            <Label style={{ fontSize: "18px", margin: "10px 0 10px 0" }}>Progreso</Label>

            <Progress
              value={progress}
              className="corp-progress-root"
            />

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", margin: "10px 0" }}>
              <span>
                {progress}% = {manAddInfo.actualAmount}Kg
              </span>

              <span>
                100% = {manAddInfo.targetAmount}Kg
              </span>

              {showBasket && (
                <Button
                  variant="secondary"
                  className="corp-btn corp-progress-action"
                  onClick={() => onBasketClick?.(manAddInfo.id)}
                >
                  <ShoppingBasket />
                  Registrar Lotes
                </Button>
              )}
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}