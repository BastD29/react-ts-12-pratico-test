import {
  GraysColors,
  GreenColors,
  RedColors,
  ThemeColors,
  VioletColors,
  YellowColors,
} from "../../models/enum/Colors";
// --- END OF IMPORTS ----------------------------------------------------------------

const THEME_COLORS = new Map<ThemeColors, string>([
  [ThemeColors.Primary, "hsl(274, 70%, 22%)"],
  [ThemeColors.Primary100, "hsl(261, 100%, 94%)"],
  [ThemeColors.Primary200, "hsl(261, 93%, 84%)"],
  [ThemeColors.Primary300, "hsl(258, 92%, 77%),"],
  [ThemeColors.Primary400, "hsl(256, 69%, 63%)"],

  [ThemeColors.Secondary, "hsl(42, 91%, 55%)"],
]);

const GRAYS_COLORS = new Map<GraysColors, string>([
  [GraysColors.White, "hsl(0, 0%, 100%)"],
  [GraysColors.Gray100, "hsl(210, 20%, 98%)"],
  [GraysColors.Gray200, "hsl(220, 14%, 96%)"],
  [GraysColors.Gray300, "hsl(220, 13%, 91%)"],
  [GraysColors.Gray400, "hsl(216, 12%, 84%)"],
  [GraysColors.Gray500, "hsl(218, 11%, 65%)"],
  [GraysColors.Gray600, "hsl(220, 9%, 46%)"],
  [GraysColors.Gray700, "hsl(215, 14%, 34%)"],
  [GraysColors.Gray800, "hsl(217, 19%, 27%)"],
  [GraysColors.Gray900, "hsl(215, 28%, 17%)"],
  [GraysColors.Gray, "hsl(221, 39%, 11%)"],
]);

const RED_COLORS = new Map<RedColors, string>([
  [RedColors.Red, "hsl(4, 86%, 58%)"],
  [RedColors.Red100, "hsl(3, 90%, 96%)"],
  [RedColors.Red200, "hsl(4, 86%, 83%)"],
  [RedColors.Red300, "hsl(4, 86%, 65%)"],
  [RedColors.Red400, "hsl(4, 62%, 41%)"],
  [RedColors.Red500, "hsl(4, 62%, 35%)"],
]);

const YELLOW_COLORS = new Map<YellowColors, string>([
  [YellowColors.Yellow100, "hsl(42, 92%, 95%)"],
  [YellowColors.Yellow200, "hsl(42, 92%, 90%)"],
  [YellowColors.Yellow300, "hsl(42, 90%, 85%)"],
  [YellowColors.Yellow400, "hsl(42, 90%, 79%)"],
  [YellowColors.Yellow500, "hsl(42, 91%, 74%)"],
  [YellowColors.Yellow600, "hsl(43, 91%, 69%)"],
  [YellowColors.Yellow700, "hsl(43, 91%, 64%)"],
  [YellowColors.Yellow800, "hsl(42, 91%, 59%)"],
  [YellowColors.Yellow900, "hsl(42, 91%, 54%)"],
]);

const GREEN_COLORS = new Map<GreenColors, string>([
  [GreenColors.Green100, "hsl(152, 55%, 94%)"],
  [GreenColors.Green200, "hsl(152, 53%, 65%),"],
  [GreenColors.Green300, "hsl(152, 54%, 50%)"],
  [GreenColors.Green400, "hsl(152, 82%, 28%)"],
  [GreenColors.Green500, "hsl(152, 82%, 24%)"],
  [GreenColors.Green600, "hsl(152, 82%, 39%)"],
]);

const VIOLET_COLORS = new Map<VioletColors, string>([
  [VioletColors.Violet100, "hsl(262, 100%, 98%)"],
  [VioletColors.Violet200, "hsl(261, 100%, 94%)"],
  [VioletColors.Violet300, "hsl(265, 49%, 86%)"],
  [VioletColors.Violet400, "hsl(269, 30%, 70%)"],
  [VioletColors.Violet500, "hsl(271, 26%, 62%)"],
  [VioletColors.Violet600, "hsl(271, 24%, 54%)"],
  [VioletColors.Violet700, "hsl(272, 26%, 46%)"],
  [VioletColors.Violet800, "hsl(274, 35%, 38%)"],
  [VioletColors.Violet900, "hsl(273, 48%, 30%)"],
]);

const COLORS = new Map<string, string>([
  ...THEME_COLORS.entries(),
  ...GRAYS_COLORS.entries(),
  ...RED_COLORS.entries(),
  ...YELLOW_COLORS.entries(),
  ...GREEN_COLORS.entries(),
  ...VIOLET_COLORS.entries(),
]);

export default COLORS;
