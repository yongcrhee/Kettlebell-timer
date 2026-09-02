Kettlebell Timer Version 4

New: speaks the next exercise name when the exercise break begins.
Also announces the first exercise and the first exercise of the next set.
Countdown numbers do not interrupt an exercise-name announcement.
For breaks of 3 seconds or less, the exercise is announced when work starts.
Pause and End stop speech. Existing saved-workout keys are unchanged.

Install this update on the SAME GitHub Pages site used for version 3:
1. Extract this ZIP.
2. Upload index.html and sw.js to the repository folder holding the existing
   index.html and sw.js, replacing those two files. Do not upload just the ZIP.
3. Commit the changes and wait for the existing Pages deployment to finish.
4. Open the same app/site online, close it, and reopen or refresh it.
5. The home screen should show "Version 4".

Keep the existing manifest and icon files. Do not clear site data or uninstall
the app as an update step, because saved workouts are stored on the device.
This package updates the version 3 browser/PWA files, not a compiled Android APK.

Turn up media volume and start a workout to test speech on your phone.
Voice availability depends on the browser and installed text-to-speech engine.
If speech is unavailable, visual exercise names and beeps still work.

Validation: JavaScript session-flow checks passed. Actual voice output and
the installed-phone update have not been tested on your device.
