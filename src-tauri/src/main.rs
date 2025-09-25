// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
    Manager,
    menu::{Menu, MenuItem},
    tray::{TrayIconBuilder},
};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let quit = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&quit])?;
            TrayIconBuilder::with_id("main-tray")
                .icon(app.default_window_icon().cloned().expect("missing tray.png"))
                .tooltip("toggle-mode-widget")
                .menu(&menu) 
                .on_menu_event(|app, e| {
                    if e.id() == "quit" {
                        app.exit(0);
                    }
                })
                .on_tray_icon_event(|_tray, ev| match ev {
                    tauri::tray::TrayIconEvent::Click { button: tauri::tray::MouseButton::Left, .. } => {
                    if let Some(win) = _tray.app_handle().get_webview_window("main") {
                        if win.is_visible().unwrap_or(false) {
                        let _ = win.hide();
                        } else {
                        let _ = win.show();
                        let _ = win.set_focus();
                        }
                    }
                    }
                    _ => {}
                })
                .build(app)?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
