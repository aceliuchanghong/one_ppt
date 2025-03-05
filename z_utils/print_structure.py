from tree_utils.struct_tree_out import print_tree

path = "../one_ppt"
exclude_dirs_set = {
    "z_utils",
    ".env",
    "LICENSE",
    ".gitignore",
    ".python-version",
    "pyproject.toml",
    "README.md",
    "uv.lock",
    "b_prompt.md",
    "f_prompt.md",
    "package-lock.json",
    "node_modules",
    "frontend",
    "z_using_files",
    "turorial.md",
    "test_llm.py",
}
print_tree(directory=path, exclude_dirs=exclude_dirs_set)
# uv run z_utils/print_structure.py
