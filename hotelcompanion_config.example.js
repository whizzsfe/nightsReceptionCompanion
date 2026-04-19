// hotelcompanion_config.example.js
// ─────────────────────────────────────────────────────────────────────────────
// Property-specific configuration for the Night Receptionist Companion Suite.
//
// HOW TO USE:
//   1. Copy this file and rename the copy to  hotelcompanion_config.js
//   2. Edit the values below for your property.
//   3. Place hotelcompanion_config.js in the same OneDrive folder as
//      hotelcompanion_suite.html  (alongside hotelcompanion_items.js etc.)
//   4. Reload the app — your settings will take effect immediately.
//
// NOTE: Values set here are the *first-run defaults* only.
//       Once a staff member saves changes via the Brand Customisation modal,
//       their choices are stored in localStorage and take priority.
//       To reset to these defaults, ask the staff member to clear their
//       browser's site data for this file, or use the Brand modal to re-apply.
// ─────────────────────────────────────────────────────────────────────────────
window.HOTELCOMPANION_CONFIG = {
  // Full property name shown in the sidebar, print headers, and AI Coach.
  hotelName: 'My Hotel Name',

  // Path to the hotel logo image, relative to the folder containing hotelcompanion_suite.html.
  // Used as the default logo in the sidebar, printed documents, sign generator, and group check-in.
  // The logo can also be changed at runtime via the Brand Customisation modal — that choice is saved
  // in localStorage and takes priority over this setting.
  logoPath: 'hotelLogo.jpg',

  // Brand accent colour (hex). Replaces the gold --gold CSS variable.
  // 14 presets are available in the Brand Customisation modal, or use any hex.
  brandColour: '#D4A843',

  // Name of the subfolder inside the chosen OneDrive folder where shift JSON
  // files are saved. Change this if your property uses a different folder name.
  shiftBaseFolder: 'shiftLogs',

  // Whether the "Persist Data" toggle should default to ON (true) or OFF (false).
  // OFF is recommended for shared terminals; ON is convenient for single-user PCs.
  persistDefault: true
};
