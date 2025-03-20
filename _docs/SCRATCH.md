# Notes Scratch
## print full repository contents into single TXT file 

```shell


find . \( -type d \( -name "node_modules" -o -name ".git" -o -name "_scratch" -o -name "_sandbox" -o -name "vercel" -o -name ".output" -o -name ".nuxt"    -o -name "tmp" -o -name "dist" -o -name "assets" -o -name "public" -o -name "build" -o -name "output" -o -name "workers" -o -name ".vscode" -o -name ".idea" \) -prune \) -o \( -type f -not \( -name ".DS_Store" -o -name "package-lock.json" -o -name ".env" -o -name "*.png" -o -name "*.jpg" -o -name "*.iml" \) -print0 \) | sort -z | xargs -0 awk 'FNR==1 { if (NR>1) { printf "\n\047\047\047---\n" } ; printf "\n\047\047\047---%s---\047\047\047\n", FILENAME } { print } END { printf "\n\047\047\047---\n" }' > tmp/atc-com-full.txt

```

## prompt

```text


Each is a .txt file that represents an entire npm package repository. The repository's individual files are separated by the sequence '''--- , followed by the file path, ending with ---. Each file's content begins immediately after its file path and extends until the next sequence of '''--- 

analyze this repository.

Help me clean this project up. I am trying to replace bitly with a custom landing page highlighting events for my standup comedy shows.

This is using nuxt3, tailwindcss & flowbite.

This project will be deployed to Vercel & will have Cloudflare in front of it.

-----

```
