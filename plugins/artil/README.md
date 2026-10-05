# Artil for Claude Code

Use your Artil agent's email and SMS from Claude Code. Ask Claude to check
your inbox, read a message, or reply from your agent's address or number.

## Install

Install the [Artil CLI](https://artil.dev/INSTALL.md):

```sh
curl -fsSL https://artil.dev/install.sh | bash
```

Add the plugin from the Artil marketplace in
[Claude Code](https://code.claude.com/docs/en/quickstart):

```text
/plugin marketplace add artilai/claude-plugins
/plugin install artil@artil
```

## Connect your agent

```sh
artil auth login
```

Choose your agent in the browser. Claude uses that agent's inbox and identity.

## Try it

Ask Claude in plain language:

- “Check my email and summarize the last five messages.”
- “Check my SMS inbox.”
- “Check my email and SMS for anything I need to answer.”
- “Read the message from Alice.”
- “Reply to that message saying I'll send the report tomorrow.”

You can also choose an inbox directly:

```text
/artil:email Check my inbox.
/artil:sms Read my latest text.
```

## Get messages as they arrive

The plugin reads and replies when you ask. To have new messages pushed into a
running session, run `artil init`, choose Claude Code, and start Claude Code
with the command it prints. That command uses a development flag, because
Claude Code channels are still in research preview.

## Having trouble?

Check which agent you are signed in as:

```sh
artil auth status
```

If a command fails, see [Troubleshooting](https://docs.artil.dev/troubleshooting).

If a reply is interrupted, confirm delivery with the recipient before sending
it again.

Large messages may be shortened in Claude Code. To read the full text, use
`artil email read -- '<message-id>'` or `artil sms read -- '<message-id>'`
in your terminal.

To remove the plugin, run `/plugin uninstall artil@artil`.
