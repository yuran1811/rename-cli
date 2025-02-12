<h1 align="center">rename-cli</h1>
<p align="center" style="font-size:16px"><strong>Rename files and folders in root folder</strong></p>
<p align="center">  
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/palette/macchiato.png" width="400" />
</p>

<p align="center">
  <img alt="Stars" src="https://badgen.net/github/stars/yuran1811/rename-cli">
  <img alt="Forks" src="https://badgen.net/github/forks/yuran1811/rename-cli">
  <img alt="Issues" src="https://badgen.net/github/issues/yuran1811/rename-cli">
  <img alt="Commits" src="https://badgen.net/github/commits/yuran1811/rename-cli">
  <img alt="Code Size" src="https://img.shields.io/github/languages/code-size/yuran1811/rename-cli">
</p>

## Tech Stack

<img src="https://skill-icons-livid.vercel.app/icons?i=nodejs&gap=60" height="36" />

## Usage

### Basic Usage

```shell
node src
```

or run executor file (downloaded from [releases](https://github.com/yuran1811/rename-cli/releases))

```shell
rn
```

### Advanced Usage

```shell
node src -b -p <path> -y
```

or

```shell
rn -b -p <path> -y
```

```console
node src [options]

    Options:

	-y			Default rename method
	-b, --backup		Create backup file
	-p, --path <path>	Folder path
	-h, --help		Display help for command
```

## Developing

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed or downloaded on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)

**Cloning the Repository**

```bash
git clone https://github.com/yuran1811/rename-cli.git
cd rename-cli
```

**Installation**

Install the project dependencies:

```bash
npm install
```

or

```bash
yarn
```

**Running the Project**

```bash
npm start
```

or

```bash
yarn start
```
