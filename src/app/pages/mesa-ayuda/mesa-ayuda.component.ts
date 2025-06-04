import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


interface Ticket {
  estado: string;
  prioridad: string;
  titulo: string;
}

@Component({
  selector: 'app-mesa-ayuda',
  imports: [
    MatIconModule,
    CommonModule,
    FormsModule,           
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,    
    MatInputModule         
  ],
  templateUrl: './mesa-ayuda.component.html',
  styleUrl: './mesa-ayuda.component.css'
})
export class MesaAyudaComponent {
  displayedColumns: string[] = ['estado', 'prioridad', 'titulo'];
  dataSource = new MatTableDataSource<Ticket>([]);
  nuevoTicket: Ticket = { estado: '', prioridad: '', titulo: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.obtenerTickets();
  }

  obtenerTickets() {
    this.http.get<Ticket[]>('http://localhost:3000/').subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }
    });
  }

  agregarTicket() {
    debugger
    this.http.get<Ticket>('http://localhost:3000/post-tickets').subscribe({
      next: (data) => {
        this.obtenerTickets();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}