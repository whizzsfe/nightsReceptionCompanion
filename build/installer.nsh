; build/installer.nsh
; Custom NSIS macros for Night Receptionist Companion installer.
;
; PURPOSE: Preserve user data files during app upgrades.
; On upgrade the old uninstaller removes the entire install directory,
; wiping property-specific config, custom scripts, rota data, shift logs
; and custom logos. These macros back everything up to %TEMP% before
; the old version is removed, then restore it after the new version installs.
;
; Files/folders preserved across upgrades:
;   hotelcompanion_config.js    — property configuration
;   hotelcompanion_items.js     — custom checklist items
;   hotelcompanion_scripts.js   — custom AI scripts
;   hotelcompanion_rota.json    — rota / contacts data
;   hotelLogo.jpg               — custom hotel logo
;   hotelLogo.ico               — custom hotel logo (icon)
;   shiftLogs\                  — all shift log files (full folder tree)

; ---------------------------------------------------------------------------
; Helper: copy one file from $INSTDIR to backup dir $R0 (if it exists)
; ---------------------------------------------------------------------------
!macro _HC_Backup filename
  ${If} ${FileExists} "$INSTDIR\${filename}"
    CopyFiles /SILENT "$INSTDIR\${filename}" "$R0\${filename}"
  ${EndIf}
!macroend

; ---------------------------------------------------------------------------
; Helper: restore one file from backup dir $R0 to $INSTDIR (if it exists)
; ---------------------------------------------------------------------------
!macro _HC_Restore filename
  ${If} ${FileExists} "$R0\${filename}"
    CopyFiles /SILENT "$R0\${filename}" "$INSTDIR\${filename}"
  ${EndIf}
!macroend

; ---------------------------------------------------------------------------
; customUnInstall — runs at the START of the uninstall process, before any
; files are deleted. Backs up user data to %TEMP%\NightCompanionUserData\.
; This fires for both full uninstalls AND silent uninstalls triggered by
; an upgrade installer, so data is always preserved.
; ---------------------------------------------------------------------------
!macro customUnInstall
  StrCpy $R0 "$TEMP\NightCompanionUserData"
  ; Clear any stale backup from a previous run
  RMDir /r "$R0"
  CreateDirectory "$R0"

  !insertmacro _HC_Backup "hotelcompanion_config.js"
  !insertmacro _HC_Backup "hotelcompanion_items.js"
  !insertmacro _HC_Backup "hotelcompanion_scripts.js"
  !insertmacro _HC_Backup "hotelcompanion_rota.json"
  !insertmacro _HC_Backup "hotelLogo.jpg"
  !insertmacro _HC_Backup "hotelLogo.ico"

  ; Copy entire shiftLogs folder tree (including subdirectories) into backup.
  ; CopyFiles in NSIS is not recursive — use xcopy with /E /I /Q /Y flags:
  ;   /E  — copy all subdirectories including empty ones
  ;   /I  — treat destination as directory (not a file)
  ;   /Q  — quiet (no per-file output)
  ;   /Y  — overwrite without prompting
  ${If} ${FileExists} "$INSTDIR\shiftLogs"
    ; Route through cmd.exe so xcopy is resolved from System32 and path
    ; quoting works correctly even when $INSTDIR contains spaces.
    ExecWait '$SYSDIR\cmd.exe /C xcopy "$INSTDIR\shiftLogs" "$R0\shiftLogs\" /E /I /Q /Y'
  ${EndIf}
!macroend

; ---------------------------------------------------------------------------
; customInstall — runs AFTER the new version's files have been copied.
; Restores user data from the temp backup created by customUnInstall.
; On a first-ever install the backup dir won't exist, so this is a no-op.
; ---------------------------------------------------------------------------
!macro customInstall
  StrCpy $R0 "$TEMP\NightCompanionUserData"
  ${If} ${FileExists} "$R0"
    !insertmacro _HC_Restore "hotelcompanion_config.js"
    !insertmacro _HC_Restore "hotelcompanion_items.js"
    !insertmacro _HC_Restore "hotelcompanion_scripts.js"
    !insertmacro _HC_Restore "hotelcompanion_rota.json"
    !insertmacro _HC_Restore "hotelLogo.jpg"
    !insertmacro _HC_Restore "hotelLogo.ico"

    ; Restore shift logs folder tree recursively via xcopy
    ${If} ${FileExists} "$R0\shiftLogs"
      ; Route through cmd.exe — same reason as backup step above.
      ExecWait '$SYSDIR\cmd.exe /C xcopy "$R0\shiftLogs" "$INSTDIR\shiftLogs\" /E /I /Q /Y'
    ${EndIf}

    ; Clean up the temp backup
    RMDir /r "$R0"
  ${EndIf}
!macroend
