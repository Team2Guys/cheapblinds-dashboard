import React from "react";
import { Box, Paper, Typography, Stack, alpha } from "@mui/material";
import {
  TrendingUp,
  ShoppingCart,
  People,
  Category,
  Inventory,
  AttachMoney,
} from "@mui/icons-material";

// KPI Card Component
const KPICard = ({
  label,
  count,
  icon: Icon,
  color = "#1976d2",
  trend,
  trendValue,
}: {
  label: string;
  count: number;
  icon: React.ElementType;
  color?: string;
  trend?: "up" | "down";
  trendValue?: string;
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          borderColor: alpha(color, 0.5),
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: `linear-gradient(90deg, ${color}, ${alpha(color, 0.6)})`,
        },
      }}
    >
      <Stack spacing={2}>
        {/* Icon and Trend Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: alpha(color, 0.1),
              color: color,
            }}
          >
            <Icon sx={{ fontSize: 24 }} />
          </Box>

          {trend && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 1,
                py: 0.5,
                borderRadius: "6px",
                background: trend === "up" ? alpha("#4caf50", 0.1) : alpha("#f44336", 0.1),
                color: trend === "up" ? "#4caf50" : "#f44336",
              }}
            >
              <TrendingUp
                sx={{
                  fontSize: 16,
                  transform: trend === "down" ? "rotate(180deg)" : "none",
                }}
              />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {trendValue}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Count and Label Section */}
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              fontSize: "2rem",
              lineHeight: 1.2,
            }}
          >
            {count.toLocaleString()}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              mt: 0.5,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontSize: "0.75rem",
            }}
          >
            {label}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

// Dashboard Component
export const Dashboard = () => {
  // Sample KPI data - replace with your actual API calls
  const kpiData: Array<{
    label: string;
    count: number;
    icon: React.ElementType;
    color?: string;
    trend?: "up" | "down";
    trendValue?: string;
  }> = [
    {
      label: "Total Products",
      count: 1247,
      icon: Inventory,
      color: "#1976d2",
      trend: "up",
      trendValue: "+12%",
    },
    {
      label: "Total Orders",
      count: 3542,
      icon: ShoppingCart,
      color: "#9c27b0",
      trend: "up",
      trendValue: "+8%",
    },
    {
      label: "Total Users",
      count: 8936,
      icon: People,
      color: "#2e7d32",
      trend: "up",
      trendValue: "+23%",
    },
    {
      label: "Categories",
      count: 48,
      icon: Category,
      color: "#ed6c02",
      trend: "up",
      trendValue: "+3",
    },
    {
      label: "Revenue",
      count: 125340,
      icon: AttachMoney,
      color: "#0288d1",
      trend: "up",
      trendValue: "+18%",
    },
    {
      label: "Active Admins",
      count: 12,
      icon: People,
      color: "#d32f2f",
      trend: "down",
      trendValue: "-2",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Dashboard Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
          color: "text.primary",
        }}
      >
        Dashboard Overview
      </Typography>

      {/* KPI Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </Box>
    </Box>
  );
};
