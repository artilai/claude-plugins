import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const skills = "plugins/artil/skills";
const problems = [];

function helpOf(words) {
  const usage = `artil ${words.join(" ")}`;

  try {
    const help = execFileSync("artil", [...words, "--help"], { encoding: "utf8", stdio: "pipe" });
    const lines = help.split("\n").map((line) => line.trim());

    return lines.some((line) => line === usage || line.startsWith(`${usage} `)) ? help : undefined;
  } catch {
    return undefined;
  }
}

for (const skill of readdirSync(skills)) {
  const text = readFileSync(join(skills, skill, "SKILL.md"), "utf8");

  for (const [, command] of text.matchAll(/`artil ([^`]+)`/g)) {
    const own = command.split(" -- ")[0].split(/\s+/);
    const words = own.filter((token) => /^[a-z]+$/.test(token));
    const flags = own.filter((token) => token.startsWith("--") && token !== "--help");
    const help = helpOf(words);

    if (help === undefined) {
      problems.push(`${skill}: artil ${words.join(" ")} is not a command`);
      continue;
    }

    for (const flag of flags.filter((flag) => !help.includes(flag))) {
      problems.push(`${skill}: artil ${words.join(" ")} has no ${flag}`);
    }
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(`Every artil command in ${skills} exists.`);
