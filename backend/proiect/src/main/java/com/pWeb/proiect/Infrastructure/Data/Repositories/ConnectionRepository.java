package com.pWeb.proiect.Infrastructure.Data.Repositories;


import com.pWeb.proiect.Core.DataModel.Connection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConnectionRepository extends JpaRepository<Connection, Long> {
}
