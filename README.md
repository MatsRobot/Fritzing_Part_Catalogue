# 🛠️ Fritzing_Part_Catalogue

A curated collection of high-quality, verified Fritzing components optimized for documentation and manufacturing. This catalogue features custom-built `.fzpz` parts with corrected XML metadata, optimized SVG rendering for breadboard views, and standardized PCB layer nesting. View full list
at https://matsrobot.github.io/Fritzing_Part_Catalogue


---

<table width="100%">
  <tr>
    <td width="50%" align="left" valign="middle">
      <h2>🚀 The Purpose</h2>
    </td>
    <td width="50%" align="center" valign="middle">
      <img src="https://github.com/user-attachments/assets/cd0f5f6f-d517-41c1-abda-e4bd410b75ce" alt="Catalogue Preview" width="150" style="border-radius: 8px;" />
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <p>
        Finding reliable Fritzing parts online is a major hurdle in hardware documentation. Many community-made parts contain <b>rendering bugs</b> or <b>incorrect footprint spacing</b> that can ruin a PCB design. 
      </p>
      <p>
        This repository serves as a centralized, visual library for parts I have personally created or verified to ensure they look professional and function correctly in both Breadboard and PCB views.
      </p>
      <blockquote>
        <b>Pro-Tip:</b> If you find a part here but need to tweak it, remember that a <code>.fzpz</code> file is just a renamed <code>.zip</code> archive. Rename it to access the raw SVG and XML source.
      </blockquote>
    </td>
  </tr>
</table>

---

## ✨ Why these parts are different
Every part in this catalogue has been sanitized to bypass common Fritzing rendering engine bugs:

| Feature | Fix Applied |
| :--- | :--- |
| **Scaling** | All `font-size` units sanitized (no "px") to prevent giant/tiny text. |
| **Coloring** | Hard-coded `fill` values removed for correct multi-color rendering. |
| **PCB Footprint** | Through-hole spacing verified for standard pin headers. |
| **Connectivity** | Layer IDs nested correctly (`copper1` inside `copper0`). |

---

## 📐 Catalogue Workflow
I utilize a 4-stage technical cycle to ensure every part in this library meets manufacturing standards:

1. **XML Metadata Editing:** Defining pin mappings and internal **Buses** for shared nets like GND.
2. **Breadboard SVG Design:** Grouping elements with the correct `breadboard` Layer ID.
3. **PCB SVG Design:** Ensuring precise pad spacing and proper copper layer nesting.
4. **Validation:** Running all files through <code>FritzingCheckApp</code> to detect missing IDs or non-standard tags.

---

## 📜 Resources
* **Fritzing-Parts Guide:** For a deep dive into how I create these parts, see the [MT6701 Magnetic Encoder Guide](https://github.com/MatsRobot/Create-New-Fritzing_Part-MT6701).
* **Tools:** I recommend using **Inkscape** with "Optimized SVG" settings to minimize compatibility issues.

---

<footer align="center">
  <p>© 2026 MatsRobot | Part of the Open Source Robotics Initiative</p>
  <p><small>Copyright (c) 2026 | Licensed under the <a href="https://github.com/MatsRobot/matsrobot.github.io/blob/main/LICENSE" style="color: #6a737d;">MIT License</a></small></p>
</footer>
